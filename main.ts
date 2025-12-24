namespace SpriteKind {
    export const NPC = SpriteKind.create()
    export const pokemon = SpriteKind.create()
    export const stPoke = SpriteKind.create()
}
/**
 * Ideal setup **:
 * 
 * create array that holds all wild pokemon sprites. Then find some way to store information for each sprite. After this, spawn a sprite from the array at random, and use it's stored information.
 */
/**
 * Map switching
 */
/**
 * Location Stuff
 */
/**
 * IDEAS/TO-DO LIST:
 * 
 * Gameplay/Technical
 * 
 * Make wildpoke select better
 * 
 * finish battle menus
 * 
 * *add attacks
 * 
 * *add type attacks
 * 
 * *capture wild poke
 * 
 * *add pokemon to player dex after capture
 * 
 * *switch out pokemon
 * 
 * (possibly scrap pokemon following player cuz its getting complicated)
 * 
 * Art/Music
 * 
 * *make music
 * 
 * *make official finished map
 * 
 * Other
 * 
 * *finish labeling code with comments.
 */
/**
 * Get starter pokemon
 */
// Game Loop: get pokemon fight pokemon collect pokemon
// 
// Check List:
// 
// 1. make maps and starting sprites
// 
// 3. make pokemon appear
// 
// 4. system to capture pokemon
// 
// 5. system to fight pokemon
// 
// 6. NPCs
function pokeSelect () {
    story.queueStoryPart(function () {
        controller.moveSprite(mySprite, 0, 0)
        story.spriteSayText(Oak, "Choose")
        pause(2000)
        story.spriteMoveToTile(Oak, tiles.getTileLocation(7, 6), 50)
        story.spriteMoveToTile(mySprite, tiles.getTileLocation(7, 7), 30)
        pause(1000)
        story.spriteSayText(Oak, "Water Type.")
        story.showPlayerChoices("yes", "no")
        if (story.checkLastAnswer("yes")) {
            story.clearQueuedStoryParts()
            game.splash("Water Type!")
            hasStarter = 1
            spawnStartr()
            controller.moveSprite(mySprite)
        } else {
            story.spriteMoveToTile(Oak, tiles.getTileLocation(7, 5), 50)
            pause(1000)
            story.spriteSayText(Oak, "Fire Type.")
            story.showPlayerChoices("yes", "no")
            if (story.checkLastAnswer("yes")) {
                story.clearQueuedStoryParts()
                game.splash("fire type!")
                hasStarter = 2
                spawnStartr()
                controller.moveSprite(mySprite)
            } else {
                story.spriteMoveToTile(Oak, tiles.getTileLocation(8, 5), 50)
                pause(1000)
                story.spriteSayText(Oak, "Electric Type.")
                story.showPlayerChoices("yes", "no")
                if (story.checkLastAnswer("yes")) {
                    story.clearQueuedStoryParts()
                    game.splash("electric type!")
                    hasStarter = 3
                    spawnStartr()
                    controller.moveSprite(mySprite)
                } else {
                    story.spriteMoveToTile(Oak, tiles.getTileLocation(8, 6), 50)
                    pause(1000)
                    story.spriteSayText(Oak, "Grass Type.")
                    story.showPlayerChoices("yes", "no")
                    if (story.checkLastAnswer("yes")) {
                        story.clearQueuedStoryParts()
                        game.splash("grass type!")
                        hasStarter = 4
                        spawnStartr()
                        controller.moveSprite(mySprite)
                    } else {
                        story.clearQueuedStoryParts()
                        story.spriteSayText(Oak, "well maybe next time")
                        story.spriteMoveToTile(Oak, tiles.getTileLocation(6, 8), 50)
                        controller.moveSprite(mySprite)
                    }
                }
            }
        }
    })
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile3`, function (sprite3, location2) {
    if (tiles.getLoadedMap() == Town1_Map) {
        tiles.loadConnectedMap(ConnectionKind.Door1)
        tiles.placeOnTile(mySprite, tiles.getTileLocation(8, 8))
        spawnPokeInLocation(tiles.getTileLocation(8, 8))
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.NPC, function (sprite, otherSprite) {
    if (hasStarter == 0 && tiles.getLoadedMap() == LabMap) {
        pokeSelect()
    }
})
// make array with sprites. Assign sprite data. Call random sprite and use its information in battle map.
function setBattleMap () {
    tiles.loadConnectedMap(ConnectionKind.Door2)
    tiles.centerCameraOnTile(tiles.getTileLocation(5, 5))
    tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 3))
    tiles.placeOnTile(startPoke, tiles.getTileLocation(3, 4))
    startPoke.follow(mySprite, 0)
    tiles.placeOnTile(wildPoke, tiles.getTileLocation(7, 4))
    statusBars()
    controller.moveSprite(mySprite, 0, 0)
    sprites.destroyAllSpritesOfKind(SpriteKind.NPC)
    battleMenu()
}
/**
 * WIP functions
 * 
 * *figure out how to add this to the pokeselect
 */
function giveDisks () {
    if (hasStarter < 0) {
        story.queueStoryPart(function () {
            story.spriteSayText(Oak, "Now that you have a starter..")
            story.spriteSayText(Oak, "You'll need disks for em'")
            story.spriteSayText(Oak, "Here, have these")
        })
        game.splash("Oak has given you 3 capture disks!")
        backpack.push(miniMenu.createMenuItem("capture Disk"))
    }
}
function battleMenu () {
    myMenu = miniMenu.createMenu(
    miniMenu.createMenuItem("Fight"),
    miniMenu.createMenuItem("Item"),
    miniMenu.createMenuItem("Switch"),
    miniMenu.createMenuItem("Run")
    )
    myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Width, 50)
    myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Height, 48)
    myMenu.top = 97
    myMenu.left = 20
    myMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
        myMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 11)
        myMenu.setButtonEventsEnabled(false)
        if (selection == "Item") {
            nestedMenu = miniMenu.createMenuFromArray(backpack)
            nestedMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
            	
            })
        } else if (selection == "Fight") {
            nestedMenu = miniMenu.createMenu(
            miniMenu.createMenuItem("WIP")
            )
            nestedMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
            	
            })
        } else if (selection == "Run") {
            nestedMenu = miniMenu.createMenu(
            miniMenu.createMenuItem("Run")
            )
            nestedMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
                if (selection == "Run") {
                    game.splash("You Decided to Run Away!")
                    closeBattle()
                }
            })
        } else {
            nestedMenu = miniMenu.createMenu(
            miniMenu.createMenuItem("WIP")
            )
            nestedMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
            	
            })
        }
        nestedMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Height, myMenu.height)
        nestedMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Width, 80)
        nestedMenu.left = myMenu.right + 4
        nestedMenu.top = myMenu.top
        nestedMenu.onButtonPressed(controller.B, function (selection, selectedIndex) {
            myMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 3)
            nestedMenu.close()
            myMenu.setButtonEventsEnabled(true)
        })
        nestedMenu.onButtonPressed(controller.left, function (selection, selectedIndex) {
            myMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 3)
            nestedMenu.close()
            myMenu.setButtonEventsEnabled(true)
        })
    })
}
/**
 * starter pokemon follows player between maps
 */
function spawnPokeInLocation (Location: tiles.Location) {
    if (exitLab == true) {
        tiles.placeOnTile(startPoke, Location)
    }
}
function loadPlayerLocation () {
    mySprite.setPosition(saved_X, saved_Y)
    startPoke.setPosition(saved_X, saved_Y)
}
/**
 * map stuff
 */
// make tile specific entry points for overworld.
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile2`, function (sprite5, location3) {
    if (hasStarter > 0 && tiles.getLoadedMap() == LabMap) {
        exitLab = true
        tiles.loadConnectedMap(ConnectionKind.Door1)
        tiles.placeOnTile(mySprite, tiles.getTileLocation(34, 18))
        spawnPokeInLocation(tiles.getTileLocation(34, 18))
    }
})
function savePlayerLocation () {
    saved_Y = mySprite.y
    saved_X = mySprite.x
}
function statusBars () {
    statusbar = statusbars.create(20, 4, StatusBarKind.Health)
    statusbar.value = sprites.readDataNumber(startPoke, "Health")
    statusbar.setLabel("HP", 15)
    statusbar.setColor(7, 15)
    statusbar.attachToSprite(startPoke, 0, 0)
    statusbar.setBarBorder(1, 15)
    statusbar.max = sprites.readDataNumber(startPoke, "Health")
    statusBarE = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    statusBarE.value = sprites.readDataNumber(wildPoke, "Health")
    statusBarE.setLabel("HP", 15)
    statusBarE.setColor(7, 15)
    statusBarE.attachToSprite(wildPoke, 0, 0)
    statusBarE.setBarBorder(1, 15)
    statusBarE.max = sprites.readDataNumber(wildPoke, "Health")
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.stPoke, function (sprite4, otherSprite2) {
    startPoke.follow(mySprite, 90)
})
/**
 * Store Power/Abilities for each pokemoon.
 */
function w_Pokidex () {
    WSelect = randint(0, 3)
    if (WSelect == 2) {
        wildPoke = sprites.create(assets.image`cat0`, SpriteKind.pokemon)
        sprites.setDataString(wildPoke, "Name", "banana")
        sprites.setDataString(wildPoke, "Type", "grass")
        sprites.setDataNumber(wildPoke, "Health", 50)
    } else if (WSelect == 1) {
        wildPoke = sprites.create(img`
            . . . . . . . . . . . c c . . . 
            . . . . . . . c c c c 6 3 c . . 
            . . . . . . c 6 3 3 3 3 6 c . . 
            . . c c . c 6 c c 3 3 3 3 3 c . 
            . b 5 5 c 6 c 5 5 c 3 3 3 3 3 c 
            . f f 5 c 6 c 5 f f 3 3 3 3 3 c 
            . f f 5 c 6 c 5 f f 6 3 3 3 c c 
            . b 5 5 3 c 3 5 5 c 6 6 6 6 c c 
            . . b 5 5 3 5 5 c 3 3 3 3 3 3 c 
            . c c 5 5 5 5 5 b c c 3 3 3 3 c 
            c 5 5 4 5 5 5 4 b 5 5 c 3 3 c . 
            b 5 4 b 4 4 4 4 b b 5 c b b . . 
            c 4 5 5 b 4 b 5 5 5 4 c 4 5 b . 
            c 5 5 5 c 4 c 5 5 5 c 4 c 5 c . 
            c 5 5 5 5 c 5 5 5 5 c 4 c 5 c . 
            . c c c c c c c c c . . c c c . 
            `, SpriteKind.pokemon)
        sprites.setDataString(wildPoke, "Name", "Nerva")
        sprites.setDataString(wildPoke, "Type", "electric")
        sprites.setDataNumber(wildPoke, "Health", 50)
    } else if (WSelect == 3) {
        wildPoke = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . c c c c . . . . . . . . . 
            . . c 2 2 2 2 c . . . . . . . . 
            c c e 2 2 2 2 2 . . . . . . . . 
            f f f e 2 f f 2 f . . . . . . . 
            . . f 2 2 2 2 2 f . . . . . . . 
            . . f 2 2 2 2 2 f . . . . . . . 
            . . 5 2 2 2 2 2 5 c c . . . . . 
            . f 5 5 2 2 2 5 5 4 4 c . . . . 
            . f 3 5 5 5 5 5 4 4 4 4 . . . . 
            . f 4 4 4 4 4 4 4 4 e e 4 c . . 
            . f 4 4 4 4 4 4 e e e 4 4 e f . 
            . . 4 4 4 4 4 4 e e 4 4 4 e e f 
            . . f f 4 4 4 4 4 4 4 4 e f f f 
            . . . f f e 4 4 c 4 4 e f f f . 
            . . . f 3 3 e e 3 e f f . . . . 
            `, SpriteKind.pokemon)
        sprites.setDataString(wildPoke, "Name", "flare")
        sprites.setDataString(wildPoke, "Type", "fire")
        sprites.setDataNumber(wildPoke, "Health", 50)
    } else if (WSelect == 0) {
        wildPoke = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . 8 8 8 8 . . . . 
            . . . . . . 8 8 6 6 6 6 8 . . . 
            . . . . . 8 8 8 8 8 8 6 8 . . . 
            . . . . 8 8 9 9 9 9 6 8 8 . . . 
            . . . 8 9 6 9 9 9 9 9 6 8 . 8 8 
            . . 8 9 9 9 6 9 9 9 9 6 6 8 9 8 
            . 8 9 9 9 9 6 9 9 9 9 9 6 8 9 8 
            c 9 9 9 9 9 6 9 9 9 9 9 6 9 9 c 
            c 9 9 9 f 9 6 8 8 9 9 9 6 c 9 c 
            c 9 9 9 9 9 6 9 9 c 9 9 6 c 9 c 
            . c 9 9 9 9 6 8 9 c 9 6 c c c c 
            . . c c 9 6 9 9 c c 9 8 c 8 . . 
            . . . . c c 9 9 9 9 8 6 9 8 . . 
            . . . . . . c c c c 6 6 6 8 . . 
            . . . . . . . . . . 8 8 8 . . . 
            `, SpriteKind.pokemon)
        sprites.setDataString(wildPoke, "Name", "whisplash")
        sprites.setDataString(wildPoke, "Type", "water")
        sprites.setDataNumber(wildPoke, "Health", 50)
    }
}
// Get starter
function spawnStartr () {
    if (hasStarter == 1) {
        startPoke = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . 8 8 8 8 . . . . 
            . . . . . . 8 8 6 6 6 6 8 . . . 
            . . . . . 8 8 8 8 8 8 6 8 . . . 
            . . . . 8 8 9 9 9 9 6 8 8 . . . 
            . . . 8 9 6 9 9 9 9 9 6 8 . 8 8 
            . . 8 9 9 9 6 9 9 9 9 6 6 8 9 8 
            . 8 9 9 9 9 6 9 9 9 9 9 6 8 9 8 
            c 9 9 9 9 9 6 9 9 9 9 9 6 9 9 c 
            c 9 9 9 f 9 6 8 8 9 9 9 6 c 9 c 
            c 9 9 9 9 9 6 9 9 c 9 9 6 c 9 c 
            . c 9 9 9 9 6 8 9 c 9 6 c c c c 
            . . c c 9 6 9 9 c c 9 8 c 8 . . 
            . . . . c c 9 9 9 9 8 6 9 8 . . 
            . . . . . . c c c c 6 6 6 8 . . 
            . . . . . . . . . . 8 8 8 . . . 
            `, SpriteKind.stPoke)
        evolution = 0
        sprites.setDataString(startPoke, "Name", "blub blub")
        sprites.setDataNumber(startPoke, "Health", 50)
        tiles.placeOnTile(startPoke, tiles.getTileLocation(3, 4))
    } else if (hasStarter == 2) {
        evolution = 0
        startPoke = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . c c c c . . . . . . . . . 
            . . c 2 2 2 2 c . . . . . . . . 
            c c e 2 2 2 2 2 . . . . . . . . 
            f f f e 2 f f 2 f . . . . . . . 
            . . f 2 2 2 2 2 f . . . . . . . 
            . . f 2 2 2 2 2 f . . . . . . . 
            . . 5 2 2 2 2 2 5 c c . . . . . 
            . f 5 5 2 2 2 5 5 4 4 c . . . . 
            . f 3 5 5 5 5 5 4 4 4 4 . . . . 
            . f 4 4 4 4 4 4 4 4 e e 4 c . . 
            . f 4 4 4 4 4 4 e e e 4 4 e f . 
            . . 4 4 4 4 4 4 e e 4 4 4 e e f 
            . . f f 4 4 4 4 4 4 4 4 e f f f 
            . . . f f e 4 4 c 4 4 e f f f . 
            . . . f 3 3 e e 3 e f f . . . . 
            `, SpriteKind.stPoke)
        sprites.setDataString(startPoke, "Name", "pheno")
        sprites.setDataNumber(startPoke, "Health", 50)
        tiles.placeOnTile(startPoke, tiles.getTileLocation(3, 4))
    } else if (hasStarter == 3) {
        evolution = 0
        startPoke = sprites.create(img`
            . . . . . . . . . . . c c . . . 
            . . . . . . . c c c c 6 3 c . . 
            . . . . . . c 6 3 3 3 3 6 c . . 
            . . c c . c 6 c c 3 3 3 3 3 c . 
            . b 5 5 c 6 c 5 5 c 3 3 3 3 3 c 
            . f f 5 c 6 c 5 f f 3 3 3 3 3 c 
            . f f 5 c 6 c 5 f f 6 3 3 3 c c 
            . b 5 5 3 c 3 5 5 c 6 6 6 6 c c 
            . . b 5 5 3 5 5 c 3 3 3 3 3 3 c 
            . c c 5 5 5 5 5 b c c 3 3 3 3 c 
            c 5 5 4 5 5 5 4 b 5 5 c 3 3 c . 
            b 5 4 b 4 4 4 4 b b 5 c b b . . 
            c 4 5 5 b 4 b 5 5 5 4 c 4 5 b . 
            c 5 5 5 c 4 c 5 5 5 c 4 c 5 c . 
            c 5 5 5 5 c 5 5 5 5 c 4 c 5 c . 
            . c c c c c c c c c . . c c c . 
            `, SpriteKind.stPoke)
        sprites.setDataString(startPoke, "Name", "nerva")
        sprites.setDataNumber(startPoke, "Health", 50)
        tiles.placeOnTile(startPoke, tiles.getTileLocation(3, 4))
    } else if (hasStarter == 4) {
        evolution = 0
        startPoke = sprites.create(assets.image`cat0`, SpriteKind.stPoke)
        sprites.setDataString(startPoke, "Name", "banana")
        sprites.setDataNumber(startPoke, "Health", 50)
        tiles.placeOnTile(startPoke, tiles.getTileLocation(3, 4))
    }
}
function mapControl () {
    scene.setBackgroundColor(7)
    LabMap = tiles.createMap(tilemap`level3`)
    Town1_Map = tiles.createMap(tilemap`level2`)
    battleMap = tiles.createMap(tilemap`level4`)
    tiles.loadMap(LabMap)
    tiles.connectMapById(Town1_Map, battleMap, ConnectionKind.Door2)
    tiles.connectMapById(LabMap, Town1_Map, ConnectionKind.Door1)
    if (tiles.getLoadedMap() == LabMap) {
        tiles.placeOnTile(mySprite, tiles.getTileLocation(8, 8))
        Oak = sprites.create(img`
            . . . . f f f f . . . . 
            . . f f e e e e f f . . 
            . f f e e e e e e f f . 
            f f f f 4 e e e f f f f 
            f f f 4 4 4 e e f f f f 
            f f f 4 4 4 4 e e f f f 
            f 4 e 4 4 4 4 4 4 e 4 f 
            f 4 4 f f 4 4 f f 4 4 f 
            f e 4 d d d d d d 4 e f 
            . f e d d b b d d e f . 
            . f f e 4 4 4 4 e f f . 
            e 4 f b 1 1 1 1 b f 4 e 
            4 d f 1 1 1 1 1 1 f d 4 
            4 4 f 6 6 6 6 6 6 f 4 4 
            . . . f f f f f f . . . 
            . . . f f . . f f . . . 
            `, SpriteKind.NPC)
        tiles.placeOnTile(Oak, tiles.getTileLocation(9, 8))
    }
}
/**
 * Battle stuff
 * 
 * (make pokidex scalable and efficient. )
 */
function closeBattle () {
    loadPlayerLocation()
    statusbar.setFlag(SpriteFlag.Invisible, true)
    tiles.loadMap(Town1_Map)
    sprites.destroy(wildPoke)
    myMenu.close()
    nestedMenu.close()
    controller.moveSprite(mySprite)
    scene.cameraFollowSprite(mySprite)
}
scene.onOverlapTile(SpriteKind.Player, sprites.swamp.swampTile1, function (sprite2, location) {
    fightRNG = randint(1, 100)
    if (fightRNG == 12) {
        savePlayerLocation()
        w_Pokidex()
        game.splash("Wild Pokemon! It's " + sprites.readDataString(wildPoke, "Name") + "!")
        setBattleMap()
    }
})
let fightRNG = 0
let battleMap: tiles.WorldMap = null
let evolution = 0
let WSelect = 0
let statusBarE: StatusBarSprite = null
let statusbar: StatusBarSprite = null
let saved_Y = 0
let saved_X = 0
let nestedMenu: miniMenu.MenuSprite = null
let myMenu: miniMenu.MenuSprite = null
let wildPoke: Sprite = null
let startPoke: Sprite = null
let LabMap: tiles.WorldMap = null
let Town1_Map: tiles.WorldMap = null
let backpack: miniMenu.MenuItem[] = []
let Oak: Sprite = null
let exitLab = false
let hasStarter = 0
let mySprite: Sprite = null
mySprite = sprites.create(img`
    . . . . f f f f . . . . . 
    . . f f f f f f f f . . . 
    . f f f f f f c f f f . . 
    f f f f f f c c f f f c . 
    f f f c f f f f f f f c . 
    c c c f f f e e f f c c . 
    f f f f f e e f f c c f . 
    f f f b f e e f b f f f . 
    . f 4 1 f 4 4 f 1 4 f . . 
    . f e 4 4 4 4 4 4 e f . . 
    . f f f e e e e f f f . . 
    f e f b 7 7 7 7 b f e f . 
    e 4 f 7 7 7 7 7 7 f 4 e . 
    e e f 6 6 6 6 6 6 f e e . 
    . . . f f f f f f . . . . 
    . . . f f . . f f . . . . 
    `, SpriteKind.Player)
scene.cameraFollowSprite(mySprite)
controller.moveSprite(mySprite)
hasStarter = 0
mapControl()
exitLab = false
story.spriteSayText(Oak, "You need a starter!")
backpack = [miniMenu.createMenuItem("abc")]
