# Trivia Challange test project

Due to no annotation provided and some issues with Figma designs, i had to solve some problems by myself. I provide the information about it below and put screenshots on [Google Disk](https://docs.google.com/document/d/1xtAt2-AT9jfdrMSXTj7wlVbzGx03_2sCFHfOpiQ_PS4/edit?usp=sharing):

1. No close button in desctop version on second screen. I added it. (Screenshot #1)
2. The button, where, logically should be written smth like "Start the game" has "True" button. I changed it. (Screenshot #2)
3. Problems with decoration stuff: some background decoration files (on Screenshot #3) have problems (marked as FIXME), i had to disable them from project. I think, that i could create them by myself, not as .svg files, but with pure css, pseudo-elements and transform properties. However, i haven't done it, because it objectively requires too much time for a test project.

## API issues

The provided API have a lot of different issues. I have implemented some decisions, to make it work.

4. Questions amount. There is no additional annotations about hadling situations, when user would like to choose 0 or 51+ questions to play.
   * In case, if user provides 0 or amount of questions is not defined, i decided to just redirect to Home page
   * In case, if user provides 51+ questions amount and API responses with only 50 questions, my application works with 50 questions.
5. Hadling API errors. Due to no annotation provided, i use only (console.error(error)) and redirect to Home page, without any other error handlings
6. API questions' texts errors (Screenshot #4). I haven't fixed them, because i don't have any special information about stylisation. I know, how to do it and will, in case of receiving stylisation's annotations
