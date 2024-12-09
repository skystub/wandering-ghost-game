export class Player {
    constructor(scene, x, y) {
        this.scene = scene;
        this.sprite = scene.physics.add
            .image(x, y, "basket")
            .setOrigin(0.5, 0.5)
            .setDepth(2);
            
        this.sprite.setScale(0.4);
        this.sprite.setSize(16, 16).setOffset(10, 10);
        this.sprite.setCollideWorldBounds(true);
        this.sprite.setImmovable(false);
        this.sprite.body.allowGravity = false;
        
        this.speed = 160;
    }

    update(cursors) {
        this.sprite.setVelocityX(0);
        this.sprite.setVelocityY(0);

        if (cursors.left.isDown) {
            this.sprite.setVelocityX(-this.speed);
        } else if (cursors.right.isDown) {
            this.sprite.setVelocityX(this.speed);
        }

        if (cursors.up.isDown) {
            this.sprite.setVelocityY(-this.speed);
        } else if (cursors.down.isDown) {
            this.sprite.setVelocityY(this.speed);
        }
    }

    setPosition(x, y) {
        this.sprite.setPosition(x, y);
    }
}