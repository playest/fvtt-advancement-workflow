interface CharacterSheet {
    superFeatures: SuperFeature[],
    /** What is contained in the "Features" tab in the current character sheet */
    features: Feature[],
}

interface SuperFeature {
    name: string,
    level?: number,
    state: SuperFeatureState,
    choiceRule: ChoiceRule,
    choices: (SuperFeature | AdvancementAction)[],
}

type SuperFeatureState = "dormant" | "waiting" | "processed";

type ChoiceRule = ChooseAll | ChooseSome | ChooseGroups | ChooseSomeWithMandatory;

interface ChooseAll {
    chooseAll: true,
}

interface ChooseSome {
    /** How many choice can be chosen in the `choices array`. Means something like "Choose one in..." or "Choose two in..." */
    howMany: number,
}

interface ChooseSomeWithMandatory {
    mandatory: number[],
    howMany: number,
}

interface ChooseGroups {
    /** The numbers specify the indices in the `choices` array in the parent SuperFeature. Could be something like [ [1, 2], [1, 3], [2, 3] ] */
    groups: number[][],
}

type AdvancementAction = (GroupedAdvancementAction | BasicAdvancementAction) & { level?: number };
type BasicAdvancementAction = GainProficiency | GainFeature | GainLanguage | GainEquipement | GainCurrency | GainAbilityPoints | GainBaseSpeed | GainHitDice | GainMaxHp;

interface GroupedAdvancementAction {
    name: string,
    advancementActions: BasicAdvancementAction[]
};

interface GainProficiency {
    skill: string,
}

interface GainFeature {
    feature: string,
}

interface GainLanguage {
    language: string,
}

interface GainEquipement {
    itemName: string,
}

interface GainCurrency {
    gp: number,
}

interface GainHitDice {
    hitDiceGain: number,
    type: "d4" | "d6" | "d8" | "d10" | "d12"
}

interface GainMaxHp {
    maxHpGain: number,
}

interface GainBaseSpeed {
    type: "walk" | "fly" | "burrow" | "climb" | "swim",
    distance: number,
}

interface GainAbilityPoints {
    attribute: Attributes,
    bonus: number,
}

interface GainSavingThrow {
    savingThrow: Attributes,
}

type Attributes = "strength" | "dexterity" | "constitution" | "intelligence" | "wisdom" | "charisma";

/** Some basic feature that already exists in the game */
interface Feature {
    // We put only those 2 fields for this example
    name: string,
    type: FeatureType,
}

type FeatureType = "feature" | "race" | "subrace" | "class" | "subclass" | "feat" | "boon";

// Example

let myCleric: CharacterSheet = {
    features: [], // empty, fill this array is not the point of this example, this will be done by the advancement workflow
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
                                mandatory: [0], // 0 is the index of "common" in the choices array below
                                howMany: 1
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

export { }; // make it a module so that it does not pollute the global namespace