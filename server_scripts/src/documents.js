function give_pferd(player) {
    let pferd = Item.of('minecraft:writable_book', "{RepairCost:0,display:{Name:'{\"text\":\"Antrag auf Pferdezulassung\"}'},pages:[\"Antrag auf\n\
Pferdezulassung\n\
===================\n\
Name:\n\
Vorname:\n\
\n\
Pferdename:\n\
(Name) [IC-XX]\n\
\n\
Geschwindigkeit:\n\
Sprunghöhe:\n\
\"]}")
    player.give(pferd)
}

function give_steuer(player) {
    let steuer = Item.of('minecraft:writable_book', "{RepairCost:0,display:{Name:'{\"text\":\"Steuererklärung\"}'},pages:[\"--Steuererklärung--\n\
\n\
Name: Mustermann\n\
\n\
Vorname: Max\n\
\n\
Geburtstag:01.01.1800\n\
\n\
Hauptwohnsitz: [IC]\",\"----  Immobilien  ----\n\
\n\
-- Immobilie 1 --\n\
Art: Wohnung / Haus\n\
Adresse: \n\
Größe (m2): \n\
\n\
-- Immobilie 2 --\n\
Art: Wohnung / Haus\n\
Adresse: \n\
Größe (m2): \",\"---- Einkommen ----\n\
\n\
-- Beruf 1 --\n\
Gehalt: 100$\n\
Firma: Musterfirma\n\
Tätigkeit: Müllmann\n\
\n\
-- Beruf 2 --\n\
Gehalt: 100$\n\
Firma: Musterfirma 2\n\
Tätigkeit: Müllfrau\",\"---- Regeln ----\n\
\n\
Sie sind verpflichtet ein mal im Monat eine Steuererklärung an das Büro des Finanzministeriums zu senden. Alle Angaben müssen wahrheitsgemäß sein. Steuerhinterziehung wird mit Haftstrafen geahndet. Das Finanzministerium\",\"kann gelegentlich auch Kontrollen durchführen, ob alle Steuern korrekt abgerechnet werden. Dafür können Firmen überwacht und durchleuchtet werden. Auch die Größe von Wohnungen und Häusern werden überprüft.\"]}")

    player.give(steuer)
}

function give_steuer_firma(player) {
    let steuer_firma = Item.of('minecraft:writable_book', "{RepairCost:0,display:{Name:'{\"text\":\"Steueranhang Firmen\"}'},pages:[\"--Firmensteuer--\n\
\n\
Name: Mustermann\n\
\n\
Vorname: Max\n\
\n\
Geburtstag:01.01.1800\",\"----  Umsatz  ----\n\
\n\
-- Firma 1 --\n\
Name: Muster GmbH\n\
Sektor: Produktion\n\
Adresse: Testst. 1\n\
Umsatz: 100.00$\n\
\n\
-- Firma 2 --\n\
Name: \n\
Sektor: \n\
Adresse: \n\
Umsatz: \",\"---- Ausgaben ----\n\
\n\
-- Muster GmbH --\n\
Betrag: 100$\n\
Grund: Baumaterial\n\
\n\
-- Muster GmbH --\n\
Betrag: \n\
Grund: \n\
\n\
-- Andere GmbH --\n\
Betrag: \n\
Grund: \",\"---- Regeln ----\n\
\n\
Dies ist ein Anhang zur Steuererklärung. Er muss von allen Firmeneigentümern mit der wöchentlichen Steuer abgegeben werden.\"]}")

    player.give(steuer_firma)
}

function giveWaffen(player) {
    let waffen = Item.of('minecraft:writable_book', `{RepairCost:0,display:{Name:'{\"text\":\"Antrag auf Waffenschein\"}'},pages:[\"-------------------\n\
Antrag auf Waffenschein\n\
-------------------\n\
Name:\n\
\n\
Vorname:\n\
\n\
Geboren:\n\
\n\
Grund:\n\
\n\
\n\
\n\
\"]}`);

    player.give(waffen)
}

function giveImport(player) {
    let importantrag = Item.of('minecraft:writable_book', `{RepairCost:0,display:{Name:'{\"text\":\"Importantrag\"}'},pages:[\"-------------------
Importantrag
-------------------
Name:

Vorname:

Geboren:

Lieferadresse:

--> Nächste Seite\",\"-------------------
Importantrag
-------------------
Waren:\",\"-------------------
Importantrag
-------------------
Waren:







*wenn notwendig weitere Seiten erstellen*\"]}`);

    player.give(importantrag)
}

function giveFirma(player) {
    let firma = Item.of('minecraft:writable_book', `{RepairCost:0,display:{Name:'{\"text\":\"Antrag auf Firmenlizenz\"}'},pages:[\"-------------------
Firmenantrag
Angaben zum Besitzer
-------------------
Name:

Vorname:

Geboren:

Adresse:\",\"-------------------
Firmenantrag
Angaben zur Firma
-------------------
Firmenname:

Firmenart:

Unfallhaftung:

\",\"-------------------
Firmenantrag
Angaben zur Firma
-------------------
Firmenadresse(n):\"]}`);

    player.give(firma)

}

function sign_document(Commands, Arguments, context, tag, author, city) {
    const player = context.source.player;

    if (!player.getTags().contains(tag)) {
        player.tell(Component.red("Du hast keine Berechtigung, diesen Befehl auszuführen!"));
        return 0;
    }

    const stamp = Arguments.STRING.getResult(context, "stamp");
    const name = Arguments.STRING.getResult(context, "name");

    const item = player.getMainHandItem();

    if (item.getId() !== "minecraft:writable_book") {
        player.tell(Component.red("Du musst ein Buch in der Hand halten!"));
        return 0;
    }
    
    const pages = item.nbt.pages;
    let input = pages.toString().replace("\n", "\\\\n");
    input = input.replace("/", `\/`);
    //player.runCommand(`give @s minecraft:written_book{title: "[${stamp}] ${name}", author: "Rathaus [IC]", display: {Lore:['{"text":"[${stamp}] | Infinity City","color":"dark_purple","italic":false}']}, pages: ${JSON.stringify(JSON.parse(input).map(item => `{"text":"${item}"}`))}}`);
    if (stamp === "") {
        context.source.player.getServer().runCommandSilent(`give ${player.name.string} minecraft:written_book{title: "${name}", author: "${author}", display: {Lore:['{"text":"${city}","color":"dark_purple","italic":false}']}, pages: ${JSON.stringify(JSON.parse(input).map(item => `{"text":"${item}"}`))}}`);
    } else {
        context.source.player.getServer().runCommandSilent(`give ${player.name.string} minecraft:written_book{title: "[${stamp}] ${name}", author: "${author}", display: {Lore:['{"text":"[${stamp}] | ${city}","color":"dark_purple","italic":false}']}, pages: ${JSON.stringify(JSON.parse(input).map(item => `{"text":"${item}"}`))}}`);
    }
    
    // player.getMainHandItem().setCount(0);
    // console.log(`give @s minecraft:written_book{title: "[${stamp}] ${name}", author: "Rathaus [IC]", display: {Lore:['{"text":"[${stamp}] | Infinity City","color":"dark_purple","italic":false}']}, pages: ${JSON.stringify(JSON.parse(input).map(item => `{"text":"${item}"}`))}}`);
    return 1;
}

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('doc')
            .requires(source => source.hasPermission(2))
            .then(Commands.literal("steuer")
                .executes(context => {
                    const player = context.source.player;
                    give_steuer(player);
                    return 1;
                })
            )
            .then(Commands.literal("pferd")
                .executes(context => {
                    const player = context.source.player;
                    give_pferd(player);
                    return 1;
                })
            )
            .then(Commands.literal("waffen")
                .executes(context => {
                    const player = context.source.player;
                    giveWaffen(player);
                    return 1;
                })
            )
            .then(Commands.literal("import")
                .executes(context => {
                    const player = context.source.player;
                    giveImport(player);
                    return 1;
                })
            )
            .then(Commands.literal("firma")
                .executes(context => {
                    const player = context.source.player;
                    giveFirma(player);
                    return 1;
                })
            )
            .then(Commands.literal("steuer_firma")
                .executes(context => {
                    const player = context.source.player;
                    give_steuer_firma(player);
                    return 1;
                })
            )
    );

    event.register(
        Commands.literal("sign")
        .then(Commands.argument("stamp", Arguments.STRING.create(event))
            .then(Commands.argument("name", Arguments.STRING.create(event))
                .executes(context => {
                    sign_document(Commands, Arguments, context, "rpn.sign_documents", "Rathaus [IC]", "Infinity City");
                    return 1;
                })
            )
        )
    );
    event.register(
        Commands.literal("sign_police")
            .then(Commands.argument("stamp", Arguments.STRING.create(event))
                .then(Commands.argument("name", Arguments.STRING.create(event))
                    .executes(context => {
                        sign_document(Commands, Arguments, context, "rpn.sign_documents_police", "Polizei [IC]", "Infinity City");
                        return 1;
                    })
                )
            )
    );
    event.register(
        Commands.literal("sign_bank")
            .then(Commands.argument("stamp", Arguments.STRING.create(event))
                .then(Commands.argument("name", Arguments.STRING.create(event))
                    .executes(context => {
                        sign_document(Commands, Arguments, context, "rpn.sign_documents_bank", "Staatsbank [IC]", "Infinity City");
                        return 1;
                    })
                )
            )
    );
    event.register(
        Commands.literal("sign_savanna")
            .then(Commands.argument("stamp", Arguments.STRING.create(event))
                .then(Commands.argument("name", Arguments.STRING.create(event))
                    .executes(context => {
                        sign_document(Commands, Arguments, context, "rpn.sign_savanna", "Rathaus [SC]", "Savanna City");
                        return 1;
                    })
                )
            )
    );
    // event.register(
    //     Commands.literal("unsign")
    //         .executes( context => {
    //             const player = context.source.player;
    //             if (!player.getTags().contains("rpn.sign_documents")) {
    //                 player.tell(Component.red("Du hast keine Berechtigung, diesen Befehl auszuführen!"));
    //                 return 0;
    //             }
    //             const item = player.getMainHandItem();
    //             if (item.getId() !== "minecraft:written_book") {
    //                 player.tell(Component.red("Du musst ein Buch in der Hand halten!"));
    //                 return 0;
    //             }
    //             const input = item.nbt.pages;
                
    //             let start = input.indexOf('[');
    //             let end = input.lastIndexOf(']');
    //             let arrayContent = input.slice(start + 1, end);

                
    //             let pageStrings = arrayContent.split(/',(?![^"]*"\s*:)/).map(s =>
    //             s.trim().replace(/^'/, "").replace(/'$/, "").replace(/\n/g, "\\n")
    //             );

                
    //             let pages = pageStrings.map(p => {
    //             const obj = JSON.parse(p);
    //             return obj.text;
    //             });
                
    //             const result = JSON.stringify(pages);
    //             //player.runCommand(`give @s minecraft:writable_book{pages:${result}}`)
    //             context.source.player.getServer().runCommandSilent(`give ${player.name.string} minecraft:writable_book{pages:${result}}`);
    //         })
    // );
});
