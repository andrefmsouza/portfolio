---
title: "Architecture first: how I chose the engine, the style and the mechanics of my AI-built game"
description: "Before writing any code, I worked out the game's architecture with Claude: why Godot beat Unity and Unreal, how Bartle's taxonomy shaped the mechanics, and which AI tools made it into the pipeline."
date: 2026-11-27
tags: [contos-do-escuro, game-design, game-dev, godot, architecture, claude, ai]
cover: /images/blog/contos-do-escuro/cover-post-2-architecture-en.jpg
draft: false
translation: antes-de-tudo-arquitetura
---

Before opening any engine, asking Claude to write code or starting on the art, I needed to answer one question: can I build the game I have in my head, with AI, on an ordinary computer?

I had watched plenty of YouTube videos of people building games with AI, and I had looked into what was possible with the tools I had. But I hadn't tested anything. And what I had in mind sat somewhere in the middle. I didn't want a simple 2D platformer, and I didn't want something on the level of the videos where people used Fable 5, Anthropic's most advanced model, to build first-person games with realistic environments while spending a lot of money on tokens. I didn't want a childish game, and I didn't want something as heavy as GTA 6 either.

## Requirement number one: run on a weak computer

My hardware is limited. It's great for work, but it isn't a gaming rig with a latest-generation graphics card. I work on a Ryzen 7, and my laptop has integrated graphics. I wanted to play on the laptop. I also wanted friends with simpler machines, running a Ryzen 3, Core i3 or Core i5, to be able to play.

So the first rule of the project came before any other: test early on the weakest machine, so optimization wouldn't turn into a rebuild at the end. The game got two quality presets. High has volumetric fog and better shadows; low has simple fog and fewer shadows. Measuring FPS on the laptop became a fixed step of every stage.

## Player profile: Bartle's taxonomy

Even though I was also making the game for my friends, I didn't want a multiplayer game. Networking, synchronization and shared saves multiply both the work and the bugs. Above all, I wanted to start with the kind of game I enjoy.

In game design, the classic reference for this is **Bartle's taxonomy**. Richard Bartle, one of the creators of MUD, the first multi-user online game, published a paper in 1996 that sorts players into four profiles. The classification crosses two axes: whether the player prefers acting or interacting, and whether their focus is on other players or on the game world.

- **Killers:** act on other players; they compete, impose themselves and want to win.
- **Achievers:** act on the world; they complete goals and accumulate points, levels and items.
- **Socializers:** interact with other players; they talk, cooperate and build relationships.
- **Explorers:** interact with the world; they discover the map and figure out how the rules work.

![Diagram of Bartle's taxonomy: vertical axis acting and interacting, horizontal axis players and world, with killers, achievers, socializers and explorers in the four quadrants](/images/blog/contos-do-escuro/bartle-taxonomy-en.jpg)

I sit between explorer and achiever. I have strong memories of Tibia, heading out with friends to do quests and earn the items. The company was good, but I'd go alone too, because I liked having every possible quest under my belt. Fighting and socializing were never my strong points.

That led to the mechanics decision: exploration and puzzles, with occasional fights against the villain. Each encounter is a puzzle boss, with a few attacks, always telegraphed, that the player learns to read. That's how the fight with Dunkel at the end of the first chapter came about: the embers in his eyes pulse and a red marker appears on the ground before each attack, and the player has to work out when his chest is exposed.

To play with friends, the answer is the oldest one there is: everyone in the same room, passing the controller. That's why the game has checkpoints before the hard sections and at each phase of the fight, so whoever picks up the controller doesn't have to replay a long stretch, and it supports a gamepad as well as the keyboard.

## Diablo's camera, Inside's darkness, Arcane's style

I like third-person games with the camera neither too far nor too close, tilted a little. My references were **Diablo** and **Inside**. I've never played either, but I'd watched videos, and the camera placement and how much of the scene shows on screen were exactly what I wanted. I also added **Ruined King**, an RPG set in the League of Legends universe that has exploration scenes with that framing.

For the visuals, the reference was **Arcane**, from Netflix. The series made a big impression on me. I like drawing, and back then I wanted to get into animation just to make something like it. I have no idea how frame-by-frame animation is done and I'm not very skilled at digital drawing, but I wanted to bring some of that style into the game.

## The conversation with Claude

With the references in hand, I gathered the images, pasted them into the prompt and asked: can I make this real with the hardware and the knowledge I have?

Two answers shaped the project.

The first was about hardware. Inside's style is a great fit for weak computers: few textures, simple shapes and an atmosphere built from light and fog. A light that follows the character and shows only what's nearby, plus an effect that darkens the edges of the screen, cost very little and deliver almost all of the mood.

The second was about the engine.

## Why Godot, and not Unity or Unreal

I knew Unreal and Unity. I didn't know Godot. I had already seen the engine concept from the inside: as a learning exercise, I built a very basic engine of my own and an Among Us clone, where I learned to handle physics and collision between objects. Nothing close to a professional engine, but it taught me what an engine does. Claude laid out the pros and cons of each one for my situation, and Godot won for a reason tied to how the AI works.

In Godot, scenes, materials and scripts are text files. Claude can create and edit an entire level by working directly on those files, through MCP or the command line, without me keeping the editor open. In Unreal, a lot lives in binary files and visual Blueprints, which the AI doesn't edit well. Unity would work, but its editor is much heavier. Other reasons added up: Godot is free, open source and royalty-free.

## Characters: from one AI to four tools

Next I asked about 3D. Characters were the most delicate part: an image is 2D concept art, and the game needs characters that walk, turn and move consistently.

The proposed path used four tools besides Claude:

1. **Gemini**, to generate the character images;
2. **Hunyuan3D**, Tencent's AI that turns an image into a 3D model;
3. **Blender**, to fix up the models together with Claude, which was already connected to it on my computer;
4. **Mixamo**, to rig the characters and bring them to life with animation, the hardest part to do with Claude alone.

It came with a warning: these tools produce messy meshes and inconsistent textures, and the results need fixing. The warning proved right: Miguel took three versions. That's a story for another post.

The conversation also made clear what to expect from the AI in each area. Code, such as movement, enemies, dialogue, saving and shaders, it handles very well. Set pieces made of geometric shapes, like gravestones, fences and walls, come out well from Blender scripts. Characters and animation are hard, and it's best to start from ready-made bases. Over the following weeks, that's exactly how it went.

## A discovery along the way: Artcraft

With the project already under way, we discovered the Artcraft apps. They're similar to Adobe's, but free, and they ship with the MCP protocol built in, so Claude can drive each one directly, the same way it works with Godot and Blender.

They found their way into several parts of the project: FilmCraft for video editing, FigCraft for image editing and SoundCraft for audio. The game's opening video was put together in FilmCraft and SoundCraft, and the Bartle diagram in this post in FigCraft.

## The briefing that became the project's memory

With the requirements gathered and the confidence that it was feasible, I asked Claude to wrap everything up in a briefing: the rules and decisions, together with what I already had of the book and the game, the first chapters and the initial idea.

The book is also written with Claude's help, but in a different way. I'm not a writer. I dictate every line and say exactly how I want each point. Claude fixes the Portuguese and sometimes suggests how to improve a sentence, like an editor. The idea and most of the text, around 90 to 95%, are mine. That's the creative part, and it stays in my hands.

The result was `briefing_jogo.md`, the game's initial proposal. It was the starting point for everything, and it still opens every conversation in the project. That's where the project's method began: write the decisions down somewhere the AI reads every time, because it doesn't remember yesterday's conversation.

Before a single line of code, the project had already decided:

- **audience and hardware:** run on a laptop with integrated graphics and on entry-level computers;
- **player:** a single-player exploration and puzzle game, played by passing the controller;
- **visuals:** elevated camera, dark environments and stylized characters;
- **engine:** Godot, because the AI works on its text files;
- **tools:** Gemini, Hunyuan3D, Blender and Mixamo around Claude.

*Godot logo on the cover: Andrea Calabró, licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).*
