# main

Welcome to Candle, a maze game where you're an adventurer who can only see as far
in the dungeon as your candle allows.

# log in and register

Index.html is a welcome screen that links you to either guest play, instructions,
login or registration pages. In order for your scores to be submitted to the database
though you must be registered and logged in, this will allow us to tie a username
to your score. Registration is free and easy and you will receive no emails so
feel free to use a fake email. Passwords are stored in a hashed format such that
we don't know your password. If we are hacked (goodness forbid) your password will
be secure because they will only have access to your hashed password. This password
was created with a non-reversable cryptographic hash function, the hackers won't be
able to find an actual password with which they can log in.

# scores

Scores for specific maps will only populate each users highest score and will
display them in order from highest to lowest.

Scores for Quest will only populate each users highest score for the epic quest.

# maze

The maze depicts a candle moving through a dark dungeon. You are set at the
start of each maze and must find your way to the end with the limited light your
icon provides. The game runs in an infinite loop until you starve to death (your
timer runs out) or you've reached the exit (depicted with an archway).

If you're logged in you may play quest mode where you will be confronted with a
sequence of three mazes in a row. Complete the mazes and defeat the dragon to enter
your high score in the database for the quest.

# dragon

When you complete a maze you will be confronted by a great dragon who demands from
you an answer to his question about mythology. Answer incorrectly and you will be
sent to a ded page. Answer correctly and a variety of things will happen. If you're
in quest mode you will be sent to the next maze in the sequence. If you're not in
quest mode you will be sent to the high scores page to view other uses' scores.
