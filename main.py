@namespace
class SpriteKind:
    NPC = SpriteKind.create()
    pokemon = SpriteKind.create()
    stPoke = SpriteKind.create()
"""

Map switching

"""
"""

Get starter pokemon

"""
"""

map stuff

"""
"""

starter pokemon follows player between maps

"""
"""

* Ideal setup **:

create array that holds all wild pokemon sprites. Then find some way to store information for each sprite. After this, spawn a sprite from the array at random, and use it's stored information.

"""
"""

map stuff

"""
"""

randomly choose wild pokemon to battle and spawn it in battle map

"""
"""

use this if you want to use evolution i think.

"""
"""

Store Power/Abilities for each pokemoon.

"""
# Game Loop: get pokemon fight pokemon collect pokemon
# 
# Check List:
# 
# 1. make maps and starting sprites
# 
# 3. make pokemon appear
# 
# 4. system to capture pokemon
# 
# 5. system to fight pokemon
# 
# 6. NPCs
def pokeSelect():
    
    def on_queue_story_part():
        global hasStarter
        controller.move_sprite(mySprite, 0, 0)
        story.sprite_say_text(Oak, "Choose")
        pause(2000)
        story.sprite_move_to_tile(Oak, tiles.get_tile_location(7, 6), 50)
        story.sprite_move_to_tile(mySprite, tiles.get_tile_location(7, 7), 30)
        pause(1000)
        story.sprite_say_text(Oak, "Water Type.")
        story.show_player_choices("yes", "no")
        if story.check_last_answer("yes"):
            story.clear_queued_story_parts()
            game.splash("Water Type!")
            hasStarter = 1
            spawnStartr()
            controller.move_sprite(mySprite)
        else:
            story.sprite_move_to_tile(Oak, tiles.get_tile_location(7, 5), 50)
            pause(1000)
            story.sprite_say_text(Oak, "Fire Type.")
            story.show_player_choices("yes", "no")
            if story.check_last_answer("yes"):
                story.clear_queued_story_parts()
                game.splash("fire type!")
                hasStarter = 2
                spawnStartr()
                controller.move_sprite(mySprite)
            else:
                story.sprite_move_to_tile(Oak, tiles.get_tile_location(8, 5), 50)
                pause(1000)
                story.sprite_say_text(Oak, "Electric Type.")
                story.show_player_choices("yes", "no")
                if story.check_last_answer("yes"):
                    story.clear_queued_story_parts()
                    game.splash("electric type!")
                    hasStarter = 3
                    spawnStartr()
                    controller.move_sprite(mySprite)
                else:
                    story.sprite_move_to_tile(Oak, tiles.get_tile_location(8, 6), 50)
                    pause(1000)
                    story.sprite_say_text(Oak, "Grass Type.")
                    story.show_player_choices("yes", "no")
                    if story.check_last_answer("yes"):
                        story.clear_queued_story_parts()
                        game.splash("grass type!")
                        hasStarter = 4
                        spawnStartr()
                        controller.move_sprite(mySprite)
                    else:
                        story.clear_queued_story_parts()
                        story.sprite_say_text(Oak, "well maybe next time")
                        story.sprite_move_to_tile(Oak, tiles.get_tile_location(6, 8), 50)
                        controller.move_sprite(mySprite)
    story.queue_story_part(on_queue_story_part)
    

def on_on_overlap(sprite, otherSprite):
    if hasStarter == 0 and tiles.get_loaded_map() == LabMap:
        pokeSelect()
sprites.on_overlap(SpriteKind.player, SpriteKind.NPC, on_on_overlap)

def on_b_pressed():
    tiles.load_connected_map(ConnectionKind.door2)
    sprites.destroy_all_sprites_of_kind(SpriteKind.NPC)
    controller.move_sprite(mySprite)
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def spawnPokeInLocation(Location: tiles.Location):
    if exitLab == True:
        tiles.place_on_tile(startPoke, Location)
"""

make array with sprites. Assign sprite data. Call random sprite and use its information in battle map.

"""
def battle():
    tiles.load_connected_map(ConnectionKind.door2)
    tiles.place_on_tile(mySprite, tiles.get_tile_location(1, 3))
    tiles.place_on_tile(startPoke, tiles.get_tile_location(2, 5))
    startPoke.follow(mySprite, 0)
    tiles.place_on_tile(wildPoke, tiles.get_tile_location(7, 5))
    statusBars()
    controller.move_sprite(mySprite, 0, 0)
    sprites.destroy_all_sprites_of_kind(SpriteKind.NPC)
# make tile specific entry points for overworld.

def on_overlap_tile(sprite5, location3):
    global exitLab
    if hasStarter > 0 and tiles.get_loaded_map() == LabMap:
        exitLab = True
        tiles.load_connected_map(ConnectionKind.door1)
        tiles.place_on_tile(mySprite, tiles.get_tile_location(34, 18))
        spawnPokeInLocation(tiles.get_tile_location(34, 18))
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile2
        """),
    on_overlap_tile)

def statusBars():
    global statusbar, statusBarE
    statusbar = statusbars.create(20, 4, StatusBarKind.health)
    statusbar.value = sprites.read_data_number(startPoke, "Health")
    statusbar.set_label("HP")
    statusbar.set_color(7, 15)
    statusbar.attach_to_sprite(startPoke, 0, 0)
    statusbar.set_bar_border(1, 15)
    statusbar.max = sprites.read_data_number(startPoke, "Health")
    statusBarE = statusbars.create(20, 4, StatusBarKind.enemy_health)
    statusBarE.value = sprites.read_data_number(wildPoke, "Health")
    statusBarE.set_label("HP")
    statusBarE.set_color(7, 15)
    statusBarE.attach_to_sprite(wildPoke, 0, 0)
    statusBarE.set_bar_border(1, 15)
    statusBarE.max = sprites.read_data_number(wildPoke, "Health")

def on_on_overlap2(sprite4, otherSprite2):
    startPoke.follow(mySprite, 90)
sprites.on_overlap(SpriteKind.player, SpriteKind.stPoke, on_on_overlap2)

def w_Pokidex():
    global WSelect, wildPoke
    WSelect = randint(0, 3)
    if WSelect == 2:
        wildPoke = sprites.create(assets.image("""
            cat0
            """), SpriteKind.pokemon)
        sprites.set_data_string(wildPoke, "Name", "banana")
        sprites.set_data_string(wildPoke, "Type", "grass")
        sprites.set_data_number(wildPoke, "Health", 50)
    elif WSelect == 1:
        wildPoke = sprites.create(img("""
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
                """),
            SpriteKind.pokemon)
        sprites.set_data_string(wildPoke, "Name", "Nerva")
        sprites.set_data_string(wildPoke, "Type", "electric")
        sprites.set_data_number(wildPoke, "Health", 50)
    elif WSelect == 3:
        wildPoke = sprites.create(img("""
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
                """),
            SpriteKind.pokemon)
        sprites.set_data_string(wildPoke, "Name", "flare")
        sprites.set_data_string(wildPoke, "Type", "fire")
        sprites.set_data_number(wildPoke, "Health", 50)
    elif WSelect == 0:
        wildPoke = sprites.create(img("""
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
                """),
            SpriteKind.pokemon)
        sprites.set_data_string(wildPoke, "Name", "whisplash")
        sprites.set_data_string(wildPoke, "Type", "water")
        sprites.set_data_number(wildPoke, "Health", 50)
# Get starter
def spawnStartr():
    global startPoke, evolution
    if hasStarter == 1:
        startPoke = sprites.create(img("""
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
                """),
            SpriteKind.stPoke)
        evolution = 0
        sprites.set_data_string(startPoke, "Name", "blub blub")
        sprites.set_data_number(startPoke, "Health", 50)
        tiles.place_on_tile(startPoke, tiles.get_tile_location(3, 4))
    elif hasStarter == 2:
        evolution = 0
        startPoke = sprites.create(img("""
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
                """),
            SpriteKind.stPoke)
        sprites.set_data_string(startPoke, "Name", "pheno")
        sprites.set_data_number(startPoke, "Health", 50)
        tiles.place_on_tile(startPoke, tiles.get_tile_location(3, 4))
    elif hasStarter == 3:
        evolution = 0
        startPoke = sprites.create(img("""
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
                """),
            SpriteKind.stPoke)
        sprites.set_data_string(startPoke, "Name", "nerva")
        sprites.set_data_number(startPoke, "Health", 50)
        tiles.place_on_tile(startPoke, tiles.get_tile_location(3, 4))
    elif hasStarter == 4:
        evolution = 0
        startPoke = sprites.create(assets.image("""
            cat0
            """), SpriteKind.stPoke)
        sprites.set_data_string(startPoke, "Name", "banana")
        sprites.set_data_number(startPoke, "Health", 50)
        tiles.place_on_tile(startPoke, tiles.get_tile_location(3, 4))
def nestedMenu2():
    global myMenu
    myMenu = miniMenu.create_menu(miniMenu.create_menu_item("Fight"),
        miniMenu.create_menu_item("Item"),
        miniMenu.create_menu_item("Switch"),
        miniMenu.create_menu_item("Run"))
    myMenu.set_menu_style_property(miniMenu.MenuStyleProperty.WIDTH, 50)
    myMenu.set_menu_style_property(miniMenu.MenuStyleProperty.HEIGHT, 48)
    mySprite.top = 60
    mySprite.left = 10
    
    def on_button_pressed(selection, selectedIndex):
        global nestedMenu
        myMenu.set_style_property(miniMenu.StyleKind.SELECTED,
            miniMenu.StyleProperty.BACKGROUND,
            11)
        myMenu.set_button_events_enabled(False)
        if selection == "Item":
            nestedMenu = miniMenu.create_menu(miniMenu.create_menu_item("Potion",
                    img("""
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        """)),
                miniMenu.create_menu_item("Pokeball",
                    img("""
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        """)),
                miniMenu.create_menu_item("Great Ball",
                    img("""
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        """)))
        elif selection == "Fight":
            nestedMenu = miniMenu.create_menu(miniMenu.create_menu_item("WIP"))
        elif selection == "Run":
            pass
        else:
            nestedMenu = miniMenu.create_menu(miniMenu.create_menu_item("WIP_Switch"))
    myMenu.on_button_pressed(controller.A, on_button_pressed)
    nestedMenu.set_menu_style_property(miniMenu.MenuStyleProperty.HEIGHT, myMenu.height)
def mapControl():
    global LabMap, Town1_Map, battleMap, Oak
    scene.set_background_color(7)
    LabMap = tiles.create_map(tilemap("""
        level3
        """))
    Town1_Map = tiles.create_map(tilemap("""
        level2
        """))
    battleMap = tiles.create_map(tilemap("""
        level4
        """))
    tiles.load_map(LabMap)
    tiles.connect_map_by_id(Town1_Map, battleMap, ConnectionKind.door2)
    tiles.connect_map_by_id(LabMap, Town1_Map, ConnectionKind.door1)
    if tiles.get_loaded_map() == LabMap:
        tiles.place_on_tile(mySprite, tiles.get_tile_location(8, 8))
        Oak = sprites.create(img("""
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
                """),
            SpriteKind.NPC)
        tiles.place_on_tile(Oak, tiles.get_tile_location(9, 8))

def on_overlap_tile2(sprite2, location):
    global fightRNG
    fightRNG = randint(1, 100)
    if fightRNG == 12:
        w_Pokidex()
        game.splash("Wild Pokemon! It's " + sprites.read_data_string(wildPoke, "Name") + "!")
        battle()
scene.on_overlap_tile(SpriteKind.player,
    sprites.swamp.swamp_tile1,
    on_overlap_tile2)

def on_overlap_tile3(sprite3, location2):
    if tiles.get_loaded_map() == Town1_Map:
        tiles.load_connected_map(ConnectionKind.door1)
        tiles.place_on_tile(mySprite, tiles.get_tile_location(8, 8))
        spawnPokeInLocation(tiles.get_tile_location(8, 8))
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile3
        """),
    on_overlap_tile3)

fightRNG = 0
battleMap: tiles.WorldMap = None
Town1_Map: tiles.WorldMap = None
nestedMenu: miniMenu.MenuSprite = None
myMenu: miniMenu.MenuSprite = None
evolution = 0
WSelect = 0
statusBarE: StatusBarSprite = None
statusbar: StatusBarSprite = None
wildPoke: Sprite = None
startPoke: Sprite = None
LabMap: tiles.WorldMap = None
Oak: Sprite = None
exitLab = False
hasStarter = 0
mySprite: Sprite = None
mySprite = sprites.create(img("""
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
        """),
    SpriteKind.player)
scene.camera_follow_sprite(mySprite)
controller.move_sprite(mySprite)
hasStarter = 0
mapControl()
exitLab = False
story.sprite_say_text(Oak, "You need a starter!")