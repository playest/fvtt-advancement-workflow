This repository details my ideas about how to manage advancement of characters in DnD5e with FoundryVTT.

You can see a glimpse of what I want to achieve when you add levels to your class. A popup appears and you can choose which features to add to your character sheet among those proposed or not add anything.

The realted issue tag on the [DnD5e system](https://gitlab.com/foundrynet/dnd5e/) seems to be [advancement](https://gitlab.com/foundrynet/dnd5e/-/issues?label_name%5B%5D=Advancement).

# Advancement

For the purpose of this I will use the term "**document**" (which is a term internally used by Foundry) to designate feature, class, subclass, feat, races, subraces, background, items, anything that can be added to the character sheet basically. If you have a better term for this feel free to talk about it and I may edit this in accordance.

I will use the term "**advancement**" to designate the character creation process or the leveling up process which should be the same in my opinion. If you have a better term for this feel free to talk about it and I may edit this in accordance.

In general, we want to make it **easier** for the player to build a **valid character** without forbidding any combination of documents. If they want to put something invalid on their sheet (like 2 races) they should be able to.

I personally think that all of theses documents should have some kind of advancement tab. Why not have an item that gives you proficiency once you reached a certain level for example? I'll admit it's a little weird but it may open the door to amazing modules and automation.

Efforts should go into 3 directions :
- Data: provide a way to **represent the links** between all of those documents
- Edit: Provide a way to **view and edit** those links
- Workflow: provide a way to view and follow the **advancement workflow**

## Data

The links between the documents must be stored somewhere. I see two choices here:
- We store the links in the document themselves
- We create some kind of "Advancement Path" object that describe how a character can advance

I wont go into the "Advancement Path" thing here because I think it's unnecessary but we may want to explore this possibility in the future.

A character is defined by:
- Its classes and their levels
- Its subclasses
- Its races (let's say a character can have multiple, just for the fun of it)
- Its backgrounds (let's say a character can have multiple, just for the fun of it)
- Its miscellaneous features (feats and boons for example)
- Its items

I think that everything in this list is or has a feature:
- Classes are features that provides features at certain level
- Items provide 0 or more features to the owner/wearer
- 

A advancement document can be either inside:
- The root of character (classes, backgrounds and races are at this level for example)
- Inside a class (class features are there)
- Inside a background (background features are there)
- Inside a race (subraces and race features are there)
- Inside a subrace (subrace features are there)
- Inside a feature

Which means we theoretically have the following tree structure:
- Character
    - Class
        - Class features
        - Subclasses
            - Subclasses features
    - Background
        - Background features
    - Race
        - Race features
        - Subrace
            - Subrace features
    - Feats
    - Boons

See [character-sheet-tree.ts](./character-sheet-tree.ts).

We could enforce all of those types a create as many documents types as there is lines elements in this tree but in my opinion it would be better to treat everything the same way: as a **super-feature** (this term is obviously subject to change).

A **super-feature** differs from a feature in that it may be "connected" to another super-feature and can be activated by what I call an **advancement trigger**.

A super-feature is represented as a list of choices that can be in 3 states: dormant, waiting, processed.
- *dormant* means that its condition to be on the character sheet is not met
- *waiting* means that its condition to be on the character sheet is met but all choices have not been made
- *processed" means that its condition to be on the character sheet is met and all choices have been made

A choice is a tuple of two elements:
- rules for how you can choose the super-features in the least (like "choose one", or "choose two", or "choose either elements 1, 2 and 4 OR elements 1, 3 and 5", ...)
- a list of super-features

A choice has 2 state : not-made, made and not-interested.
- *not-made* is the initial state
- *waiting* 

## Edit

I have not a lot to say here.

## Workflow

[See here](https://htmlpreview.github.io/?https://github.com/playest/fvtt-advancement-workflow/blob/main/advancement.html)

# Weird Cases

I try to think of weird cases when building something because I feel that if I manage to deal with those cases the normal cases will be more than correctly managed. Of course, sometime you have to give up on one of those weird cases to simplify the task but we are not here yet.

So here are some weird use case that could be managed:
- Classes and players have more level than 20
- Multiple subclasses (even from the same class) are taken
- A document has been updated by the DM so to get the last version the player (or the DM) remove it from its character sheet and add the new one, there should be no duplicate in this case
- The players adds a document but doesn't want to (or can't) follow the advancement workflow (they may also be interrupted by a crash or a missclick)
- A player should be able to start building its character from any point, they may start by adding the class, or the race, or the subclass (yes it's weird, that's the point), or a random feature, an item
- If a duplicate Document would be added during the advancement workflow to the character sheet a confirmation (or a warning before adding it) would be
- No warning/confirmation would be needed if a Document is added by hand to the character sheet, if we find a way to do it elegantly then why not but it's not necessary
- Documents may be coming from multiple compendium
- There may be multiple Documents with the same name but different characteristics
- The advancement process should be viewable to see all the choice that have been made during the advancement process (like what Ability did I increase with my ability score improvement, what proficiency did I choose with my background, ...)
- It should be possible to go back on our choices
    - Let's say I added a class that give me a choice of proficiencies
    - among those I chose arcana and athletism
    - once they reach they choose their background they realize that athletism is mandatory in this background so they go back and choose an other class proficiency
    - I know that RAW getting a the same proficiency a second time gives you the proficiency of your choice, we may do that but I feel that my example stands
- I should be able to backtrack on any choice, changing the subclass (or subrace, or any document) should be possible and should remove any associated document but no more. It may possible to do that so we may ask the player to validate what to remove here.
- The feature tab should still be able to contain any document, and this advancement system should not forbid any combination, just guide the player during the process by showing reports of what could/should be added or removed and why

## Advancements triggers

An advancement trigger should be able to propose to:
- create a resource on the character sheet
- add a feature with specific configuration (like make the future use a existing resource on the character sheet)
- add a spell with a different ability and/or a different pool of spell slot (my way of enabling spells that can be cast once per long rest)
- add a proficiency
- add an item
- ask for a choose between any combination of the choices above (mostly a way of managing the choices in background but could be used in other cases)

## Other considerations

- How will it integrate with custom character sheets?
    - We could not care and let them update their own sheet
    - We could provide our own interface separated with a button somewhere that opens the advancement interface
    - Any other way
- Should we really manage the whole workflow?
    - Maybe we should just focus on the data part and let the community develop modules for the edit and workflow parts?

## Ideas

An elegant way to deal with subclasses could be to represent them with a class document that takes its level from an other class.