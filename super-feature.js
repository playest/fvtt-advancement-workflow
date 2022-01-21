"use strict";
;
// Example
let myCleric = {
    features: [],
    superFeatures: [
        {
            name: "Choose Background",
            state: "dormant",
            choiceRule: { howMany: 1 },
            choices: [
                {
                    name: "Acolyte",
                    state: "dormant",
                    choiceRule: { chooseAll: true },
                    choices: [
                        {
                            name: "Languages",
                            state: "dormant",
                            choiceRule: { howMany: 2 },
                            choices: [
                                { language: "common" },
                                { language: "dwarvish" },
                                { language: "elvish" },
                                { language: "draconic" },
                                // I'm not gonna list all languages here...
                            ]
                        },
                        {
                            name: "Skill Proficiencies",
                            advancementActions: [
                                { skill: "insight" },
                                { skill: "religion" }
                            ]
                        },
                        {
                            name: "Equipement",
                            state: "dormant",
                            choiceRule: { chooseAll: true },
                            choices: [
                                { itemName: "holy symbol" },
                                {
                                    name: "Prayer book or Prayer wheel",
                                    state: "dormant",
                                    choiceRule: { howMany: 1 },
                                    choices: [
                                        { itemName: "prayer book" },
                                        { itemName: "prayer wheel" },
                                    ]
                                },
                                { itemName: "stick of incense x 5" },
                                { itemName: "vestments" },
                                { itemName: "common clothes" },
                                { gp: 15 }
                            ]
                        },
                        {
                            name: "Shelter of the Faithful",
                            state: "dormant",
                            choiceRule: { chooseAll: true },
                            choices: [{ feature: "Shelter of the Faithful" }]
                        }
                    ]
                },
                {
                    name: "Non-SRD Background",
                    state: "dormant",
                    choiceRule: { chooseAll: true },
                    choices: [
                        {
                            name: "Languages",
                            state: "dormant",
                            choiceRule: { howMany: 1 },
                            choices: [
                                { language: "common" },
                                { language: "dwarvish" }
                            ]
                        },
                        {
                            name: "Skill Proficiencies",
                            advancementActions: [
                                { skill: "arcana" },
                                { skill: "acrobatics" }
                            ]
                        }
                    ]
                },
            ]
        },
        {
            name: "Choose Race",
            state: "dormant",
            choiceRule: { howMany: 1 },
            choices: [
                {
                    name: "Elf",
                    state: "dormant",
                    choiceRule: { chooseAll: true },
                    choices: [
                        {
                            name: "Ability Score Increase",
                            advancementActions: [{ attribute: "dexterity", bonus: 2 }]
                        },
                        {
                            name: "Speed",
                            advancementActions: [{ type: "walk", distance: 30 }]
                        },
                        { feature: "Keen Senses" },
                        {
                            name: "Languages",
                            advancementActions: [
                                { language: "common" },
                                { language: "elvish" }
                            ]
                        }
                        // and other stuff
                    ]
                },
                {
                    name: "Human",
                    state: "dormant",
                    choiceRule: { chooseAll: true },
                    choices: [
                        {
                            name: "Ability Score Increase",
                            advancementActions: [
                                { attribute: "strength", bonus: 1 },
                                { attribute: "dexterity", bonus: 1 },
                                { attribute: "constitution", bonus: 1 },
                                { attribute: "intelligence", bonus: 1 },
                                { attribute: "wisdom", bonus: 1 },
                                { attribute: "charisma", bonus: 1 },
                            ]
                        },
                        {
                            name: "Speed",
                            advancementActions: [{ type: "walk", distance: 30 }]
                        },
                        { feature: "Keen Senses" },
                        {
                            name: "Languages",
                            state: "dormant",
                            choiceRule: {
                                mandatory: [0],
                                howMany: 2 // including the mandatory choices
                            },
                            choices: [
                                { language: "common" },
                                { language: "dwarvish" },
                                { language: "elvish" },
                                { language: "draconic" },
                                // I'm not gonna list all languages here...
                            ]
                        }
                        // and other stuff
                    ]
                }
            ]
        },
        {
            name: "Choose Class",
            state: "dormant",
            choiceRule: { howMany: 1 },
            choices: [
                {
                    name: "Fighter",
                    state: "dormant",
                    choiceRule: { chooseAll: true },
                    choices: [
                        {
                            name: "Hit points",
                            advancementActions: [{ hitDiceGain: 1, type: "d10" }, { maxHpGain: 10 }]
                        },
                        {
                            name: "Armors",
                            advancementActions: [{ skill: "all armors" }, { skill: "shields" }]
                        },
                        {
                            name: "Weapons",
                            advancementActions: [{ skill: "simple weapons" }, { skill: "martial weapons" }]
                        },
                        {
                            name: "Skills",
                            state: "dormant",
                            choiceRule: { howMany: 2 },
                            choices: [
                                { skill: "acrobatics" },
                                { skill: "animal handling" },
                                { skill: "athletics" },
                                { skill: "history" },
                                { skill: "insight" },
                                { skill: "intimidation" },
                                { skill: "perception" },
                                { skill: "survival" },
                            ]
                        },
                        // enough with the non levelled stuff, let's try to do levelled features
                        {
                            name: "Second Wind",
                            level: 1,
                            advancementActions: [{ feature: "Second Wind" }]
                        },
                        {
                            name: "Fighting Style",
                            level: 1,
                            state: "dormant",
                            choiceRule: { howMany: 1 },
                            choices: [
                                { feature: "Archery" },
                                { feature: "Defense" },
                                { feature: "Dueling" },
                                { feature: "Great Weapon Fighting" },
                                { feature: "Protection" },
                                { feature: "Two Weapon Fighting" },
                            ]
                        },
                        {
                            name: "Action Surge",
                            level: 2,
                            advancementActions: [{ feature: "Action Surge" }]
                        },
                        {
                            level: 3,
                            name: "Martial Archtype",
                            choiceRule: { howMany: 1 },
                            state: "dormant",
                            choices: [
                                {
                                    name: "Champion",
                                    choiceRule: { chooseAll: true },
                                    state: "dormant",
                                    choices: [
                                        { level: 3, feature: "Improved Critical" },
                                        { level: 7, feature: "Remarkable Athlete" },
                                    ]
                                },
                                {
                                    name: "Non-SRD Subclass for Fighter",
                                    advancementActions: [{ feature: "Placeholder for subclass" }]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};
