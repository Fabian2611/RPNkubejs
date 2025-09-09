StartupEvents.registry("item", event => {
    event.create("vegetable_chips").texture("kubejs:item/vegetable_chips").food(food => {
        food.hunger(3).saturation(0.5).effect("farmersdelight:nourishment", 400, 0, 1.0)
    }).tag("kubejs:chips")
    event.create("carrot_slices").texture("kubejs:item/carrot_slices").food(food => {
        food.hunger(1).saturation(0.2)
    })
    
    event.create("beetroot_chips").texture("kubejs:item/beetroot_chips").food(food => {
        food.hunger(5).saturation(0.6).effect("farmersdelight:nourishment", 600, 0, 1.0)
    }).tag("kubejs:chips")
    event.create("beetroot_slices").texture("kubejs:item/beetroot_slices").food(food => {
        food.hunger(2).saturation(0.2)
    })

    event.create("fried_onion_rings").texture("kubejs:item/fried_onion_rings").food(food => {
        food.hunger(3).saturation(0.5).effect("farmersdelight:nourishment", 400, 0, 1.0)
    }).tag("kubejs:chips")
    event.create("onion_rings").texture("kubejs:item/onion_rings").food(food => {
        food.hunger(2).saturation(0.2)
    })

    event.create("nettle_chips").texture("kubejs:item/nettle_chips").food(food => {
        food.hunger(2).saturation(0.4).effect("farmersdelight:nourishment", 200, 0, 1.0)
    }).tag("kubejs:chips")

    event.create("fish_and_chips").texture("kubejs:item/fish_and_chips").food(food => {
        food.hunger(8).saturation(1.2).effect("farmersdelight:nourishment", 1800, 0, 1.0)
    })

    event.create("ring").texture("kubejs:item/ring").rarity("epic").fireResistant(true).unstackable()
})
