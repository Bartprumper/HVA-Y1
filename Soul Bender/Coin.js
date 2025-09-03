

class Coin extends Entity
{
    constructor(x, y)
    {
        super()
        this.x = x
        this.y = y
        this.diameter = unitSize
    }

    draw()
    {
        image(coinImg, this.x - 25, this.y - 25, unitSize, unitSize)
    }

    checkCollision()
    {
        if (this.circleCollision(player)) //Als de speler collision heeft met de orb, dan unlocked deze een state. En word de orb weggehaald
        {
            coinSound.setVolume(0.5)
            coinSound.play();
            Hud.playerScore += 10;
            achievementmanager.ThanksForPlaying();
            currentCoinAmount++;
            coins.splice(coins.indexOf(this), 1);
            player.HPup += 1
            achievementmanager.Greedy();
        }
    }
}