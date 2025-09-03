const MessageHandler = require('./messageHandler.js');
class GameMessageHandler extends MessageHandler {

	constructor(io, databaseConnector, rooms) {
		super(io, databaseConnector, rooms);
	}

	handleIncomingMessages(socket) {
		this.#handleIncomingStartGameMessages(socket);
		this.#handleIncomingMoveMessages(socket);
		this.#handleIncomingTurnSwitchMessages(socket); 
		this.#handleIncomingRotationMessages(socket);
		this.#handleIncomingMatchdataMessages(socket);
		this.#handleIncomingGlobalDataMessages(socket);
		this.#handleIncomingEmoteMessages(socket);
		this.#handleIncomingChatMessages(socket);
	}

	#handleIncomingStartGameMessages(socket) {
		socket.on("start game", async (data) => {
			this._rooms[data.roomId].started = true; // Markeer de room als gestart

			const sockets = await this._io.in(data.roomId).fetchSockets(); // Haal alle sockets in de room op
			if (sockets.length !== 2) // Controleer of er precies 2 spelers zijn, anders kan het spel niet starten 
			{
				console.error('Invalid number of players in room:', data.roomId);
				return;
			}

			const Team = ['Nederland', 'Belgie']; // Dit is de standaard teamindeling

			// Randomiseer de teamindeling
			if (Math.random() < 0.5) 
			{
				Team.reverse();
			}

			const NederlandPlayerIndex = Team.indexOf('Nederland'); // Vind de index van Nederland in de teamindeling
			const BelgiePlayerIndex = Team.indexOf('Belgie'); // Vind de index van Belgie in de teamindeling
			const NederlandPlayerSocket = sockets[NederlandPlayerIndex]; // Haal de socket van de Nederland speler op
			const BelgiePlayerSocket = sockets[BelgiePlayerIndex]; // Haal de socket van de Belgie speler op
			
			// Sla de teamindeling op in de socket en stuur dit naar de database
			const result = await this._databaseConnector.executePreparedQuery(
				`INSERT INTO game(roomid, time, nederland, belgie, winner) 
					VALUES(?, NOW(), ?, ?, ?)`, [data.roomId, NederlandPlayerSocket.playerName, BelgiePlayerSocket.playerName, null]);
			
			this._rooms[data.roomId].dbid = result.rows.insertId; // Sla de database ID van de game op in de room
			NederlandPlayerSocket.emit('start game', { idMatch: this._rooms[data.roomId].dbid, roomId: data.roomId, team: Team[NederlandPlayerIndex] }); // Stuur de start game message naar de Nederland speler
			BelgiePlayerSocket.emit('start game', { idMatch: this._rooms[data.roomId].dbid, roomId: data.roomId, team: Team[BelgiePlayerIndex] }); // Stuur de start game message naar de Belgie speler
		});
	}

	#handleIncomingMoveMessages(socket) {
        socket.on('move', async (data) => {
			const roomDbId = this._rooms[socket.roomId].dbid; // Haal de database ID van de game op uit de room
			await this._databaseConnector.executePreparedQuery(
				`INSERT INTO move(game, turn, team, selectedColumn) VALUES(?, ?, ?, ?)`,
				[roomDbId, data.turn, data.team, data.selectedColumn]); // Sla de zet op in de database

            this._io.to(socket.roomId).emit('move', data); // Stuur de zet naar alle spelers in de room
        });
    }

	#handleIncomingTurnSwitchMessages(socket) {
		socket.on('turn switched', (data) => {
			let nextTeam; 
			let nextTurn = data.turn;
			if (data.fromTeam === 'Nederland') {
				nextTeam = 'Belgie'; // Als de huidige team Nederland is, switch naar Belgie
			} else { 
				nextTeam = 'Nederland'; // Als de huidige team Belgie is, switch naar Nederland
				nextTurn = data.turn + 1; // Verhoog de turn als we switchen naar Nederland
			}
			this._io.to(socket.roomId).emit('turn switched', {
				roomId: socket.roomId,
				fromTeam: data.fromTeam,
				toTeam: nextTeam,
				turn: nextTurn
			}); // Stuur de turn switch message naar alle spelers in de room
		});
	}

	#handleIncomingRotationMessages(socket) {
		socket.on('rotation', (data) => {
			let nextRotation = Math.random() < 0.5 ? 'clockwise' : 'counterclockwise'; // Randomiseer de rotatie richting
			this._io.to(socket.roomId).emit('rotation', {
				direction: nextRotation,
			}); // Stuur de rotatie message naar alle spelers in de room
		});
	}

	#handleIncomingMatchdataMessages(socket) {
		socket.on('matchdata', async (data) => {
			await this._databaseConnector.executePreparedQuery(
				'INSERT INTO matchdata (game_idMatch, totaldrops, totalrotations, nearwins, winner) VALUES (?, ?, ?, ?, ?)', // Upload de match data naar de database
				[data.game_idMatch, data.totalDrops, data.totalRotations, data.nearWins, data.winner]);
			this._io.to(socket.roomId).emit('matchdata', data); // Stuur de data terug naar de clients
		});
	}

	#handleIncomingGlobalDataMessages(socket) {
		socket.on('globalwins', async (data) => {
			let nederland = await this._databaseConnector.executePreparedQuery(
				'SELECT COUNT(*) as count FROM matchdata WHERE winner = (?)', ['Nederland']); // Haalt het totaal aantal entries op waarbij de winnaar Nederland is
			let belgie = await this._databaseConnector.executePreparedQuery(
				'SELECT COUNT(*) as count FROM matchdata WHERE winner = (?)', ['Belgie']); // Haalt het totaal aantal entries op waarbij de winnaar België is
			this._io.to(socket.roomId).emit('globalwins', {
				nlwins: nederland.rows[0].count,
				bewins: belgie.rows[0].count
			});			
		});
	}

	#handleIncomingEmoteMessages(socket) {
    	socket.on('emoteData', async (data) => {
			await this._databaseConnector.executePreparedQuery(
			`INSERT INTO emotes(game_idMatch, emote_name, receiver_team, sender_team, duration) VALUES(?, ?, ?, ?, ?)`,
			[data.game, data.emote, data.receiverTeam, data.senderTeam, data.duration]); // Sla de zet op in de database
        	this._io.to(socket.roomId).emit('emoteData', data); // Voor alle sockets die in de kamer zitten, stuurt het het pakketje emoteData
    	});
	}

	#handleIncomingChatMessages(socket) {
    	socket.on('chat message', async (data) => {
			await this._databaseConnector.executePreparedQuery(
			`INSERT INTO chat(game_idMatch, sender_team, receiver_team, message) VALUES(?, ?, ?, ?)`,
			[data.game, data.fromTeam, data.toTeam, data.message]); // Sla de zet op in de database
        	this._io.to(socket.roomId).emit('chat message', data); // Voor alle sockets die in de kamer zitten, stuurt het het pakketje chat message
    	});
	}
}

module.exports = GameMessageHandler;