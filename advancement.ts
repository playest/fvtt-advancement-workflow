const DEBUG = true;

function choiceRuleToString(choiceRule: ChoiceRule) {
    if("chooseAll" in choiceRule) {
        return "choose all";
    }
    else if("mandatory" in choiceRule) {
        return "choose " + (choiceRule.howMany - choiceRule.mandatory.length) + " more";
    }
    else if("groups" in choiceRule) {
        return "choose a group";
    }
    else if("howMany" in choiceRule) {
        return "choose " + choiceRule.howMany;
    }
    throw new Error("never");
}

function basicAdvancementActionToString(action: BasicAdvancementAction): string {
    if("skill" in action) {
        return "proficiency in " + action.skill
    }
    else if("feature" in action) {
        return action.feature;
    }
    else if("language" in action) {
        return "language proficiency in " + action.language;
    }
    else if("itemName" in action) {
        return "get " + action.itemName;
    }
    else if("gp" in action) {
        return "get " + action.gp + "GP";
    }
    else if("hitDiceGain" in action) {
        return "gain " + action.hitDiceGain + " (" + action.type + ")";
    }
    else if("maxHpGain" in action) {
        return "gain " + action.maxHpGain + " max HP";
    }
    else if("distance" in action) {
        return action.type + " speed to " + action.distance;
    }
    else if("attribute" in action) {
        return action.attribute + " increase by " + action.bonus;
    }
    throw new Error("never");
}

function fillAdvancementActionBlock(name: string, advancementActions: BasicAdvancementAction[]) {
    const block = advancementActionTemplate.cloneNode(true) as HTMLElement;
    block.querySelector(".name")!.innerHTML = name;
    return block;
}

function onInputChanged(event: Event, input: HTMLInputElement, choiceRule: ChoiceRule) {
    console.log("input changed", input);
    //console.log(input.closest("ul")!.querySelectorAll(":scope > li > input"));

    let checkedCount = 0;
    input.closest("ul")!.querySelectorAll<HTMLInputElement>(":scope > li > label > input").forEach(i => {
        if(i.checked) {
            checkedCount++;
        }
    });
    console.log("checkedCount", checkedCount);
    if("howMany" in choiceRule && choiceRule.howMany !== 1) {
        if(checkedCount >= choiceRule.howMany) {
            console.log("prevent next");
            input.closest("ul")!.querySelectorAll<HTMLInputElement>(":scope > li > label > input").forEach(i => { if(i.checked == false) i.disabled = true; });
        }
        else {
            console.log("do not prevent");
            input.closest("ul")!.classList.remove("locked");
            input.closest("ul")!.querySelectorAll<HTMLInputElement>(":scope > li > label > input").forEach(i => i.disabled = false);
        }
    }

    return true;
}

function transformInput(input: HTMLInputElement, name: string, index: number, choiceRule: ChoiceRule) {
    input.dataset.index = index.toString();
    input.addEventListener("change", (event) => onInputChanged(event, input, choiceRule));
    if("chooseAll" in choiceRule) {
        input.type = "checkbox";
    }
    else if("mandatory" in choiceRule) {
        input.type = "checkbox";
        input.dataset.mandatory = choiceRule.mandatory.toString();
        if(choiceRule.mandatory.indexOf(index) !== -1) {
            input.checked = true;
        }
    }
    else if("groups" in choiceRule) {
        input.type = "checkbox";
    }
    else if("howMany" in choiceRule) {
        if(choiceRule.howMany == 1) {
            input.type = "radio";
            input.name = name;
        }
        else {
            input.type = "checkbox";
        }
    }
}

function fillSuperFeatureBlock(parentName: string, name: string, state: SuperFeatureState, choiceRule: ChoiceRule, choices: Choice[]) {
    if(DEBUG) console.group("parent", parentName, "this", name);
    const block = superFeatureTemplate.cloneNode(true) as HTMLElement;
    block.querySelector(".name")!.innerHTML = name;
    block.querySelector(".state")!.innerHTML = state;
    block.querySelector(".choice-rule")!.innerHTML = choiceRuleToString(choiceRule);

    let i = 0;
    for(const choice of choices) {
        if("choices" in choice) {
            // SuperFeature
            if(DEBUG) console.log("SuperFeature", choice.name);
            const elem = fillSuperFeatureBlock(name, choice.name, choice.state, choice.choiceRule, choice.choices);
            transformInput(elem.querySelector<HTMLInputElement>("input")!, name.replace(" ", "_"), i, choiceRule);
            block.querySelector(".choices")!.appendChild(elem);
        }
        else {
            // AdvacementAction
            if("name" in choice) {
                // GroupedAdvancementAction
                if(DEBUG) console.log("GroupedAdvancementAction", choice.name);
                const elem = fillAdvancementActionBlock(choice.name, choice.advancementActions);
                block.querySelector(".choices")!.appendChild(elem);
                transformInput(elem.querySelector<HTMLInputElement>("input")!, name.replace(" ", "_"), i, choiceRule);
            }
            else {
                // BasicAdvancementAction
                if(DEBUG) console.log("GroupedAdvancementAction", "noname");
                const feature = basicAdvancementActionTemplate.cloneNode(true) as HTMLElement;
                transformInput(feature.querySelector<HTMLInputElement>("input")!, parentName.replace(" ", "_"), i, choiceRule);
                feature.querySelector(".name")!.innerHTML = basicAdvancementActionToString(choice);
                block.querySelector(".choices")!.appendChild(feature);
            }
        }
        i++;
    }
    if(DEBUG) console.groupEnd();
    return block;
}

console.log("Starting advancement script");

const superFeatureTemplate = document.querySelector(".templates .super-feature")!.firstElementChild!;
const advancementActionTemplate = document.querySelector(".templates .advancement-action")!.firstElementChild!;
const basicAdvancementActionTemplate = document.querySelector(".templates .basic-advancement-action")!.firstElementChild!;
const advancementBlock = document.querySelector(".advancement")!;

for(const sf of myCleric.superFeatures) {
    const elem = fillSuperFeatureBlock("root", sf.name, sf.state, sf.choiceRule, sf.choices);
    advancementBlock.appendChild(elem);
}