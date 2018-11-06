# Mars Mining Discovery Tournament

## My approach

I started with a vanilla JavaScript approach because it was the method used by the example. As I started to make some progress, I began to try to factor in some React, however this proved to be difficult. I think I would to rebuild the entire board creator, and have each square on the grid be a component. After a while, I attempted to build an updating scoreboard to track the bots' progress, but I was already low on time.

## Tradeoffs I made

I decided to set the state for bots based on location because it was the fastest way to check location for painting on the grid. This has the unforunate tradeoff of making it harder to use bot location later on for something such as tracking score.

## Future goals

With more time I would've implemented:

- A finished scoreboard, which changes bots positions based on score.

Feature A would've taken roughly another hour I believe. I know how to complete it using React, but that means I would need to spend time figuring out how to convert this application to React.
