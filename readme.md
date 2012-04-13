# Gunpowder 

Gunpowder is a behaviour-driven development tool for Unity3D that allows you to make the best games, like ever.

## Pivotal Tracker Project 

https://www.pivotaltracker.com/projects/456391/

## Setup

1. Import the Gunpowder package into your project
2. In your scene, create an empty game object and call it Spec Runner
3. Create a new javascript file and call it something like MySceneSpec
4. (optional) Copy the code from the template.js file to get started
5. Attach MySceneSpec to your Spec Runner game object
6. Done. Now start writing your specs and make an awesome game!

## Matchers

- `toExist()`
- `toBeTruthy()`
- `toBeFalsy()`
- `toEqual(object)`
- `toHavePosition(x, y, z)`
- `toBeVisible()`
- `toBeHidden()`

## Simulating Input

- `move('forward|backward|left|right', milliseconds, callback)`
- `pressButton('Fire1', milliseconds, callback)`
- `pressKey('a', milliseconds, callback)`

## Event Waiting

- `waits(milliseconds, callback)`

## Known Limitations :(

- Can only have one spec file per project.

## Contributions

I would love help from anybody since this is my first time creating a testing framework and I know there are people out there MUCH smarter than me! :D Send the ol' pull request and I'll get to it right away. Please include tests though. ;) 

Thank you!
