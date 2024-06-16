# Typescript Template

[Discord.js](https://discord.js.org/) is the leading library for interacting with the Discord API, this template allows you to write your own bot with complete type safety before compiling to JavaScript.

## GitHub Templates

If you wish to simply copy this template into your own repository, you can do so by clicking the "Use this template" button on the top of this page. This will create a new repository with the contents of this template, ready to go! 🚀

## Before you begin

Before you can start using this template, you'll need to have both [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/en/) installed on your machine.

## So.. what do I need to do?

#### 1. Clone this repository

> You'll need [Git](https://git-scm.com/) to do this.

```bash
git clone https://github.com/jakemackie/discord-typescript
```

Now, let's enter the directory we just created.

```bash
cd discord-typescript
```

#### 2. Install the dependencies

> You'll need [Node.js](https://nodejs.org/en/) to do this.

```bash
npm install
```

#### 3. Get your bot token

> You'll need to get your bot token from the [Discord Developer Portal](https://discord.com/developers/applications). If you've never done this before, you can follow the [official guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot) to create a new bot.

Once you've created your bot and gotten your token, you can add it to a `.env` file in the root of your project. If you've followed up until this point, you'll notice there is not a `.env` file in the root of the project. This is to keep both you and I safe when making public changes to the project that may contain sensitive information.
<br />
<br />
Create yourself a `.env` file and add your token to it. The `.env.example` file in the root of the project shows you what your file should look like.

#### 4. Run the bot

You made it this far! Now, I have provided multiple ways to run your bot. As you are writing in Typescript there are a few options available to you.

> Development (doesn't require `build` step, not recommended for production)

```bash
npm run dev
```

> Build (compiles to JavaScript)

```bash
npm run build
```

> Start (requires `build` step, recommended for production)

```bash
npm start
```

#### 5. Database setup

If you want to use a Database with your bot, I've included [Drizzle ORM](https://orm.drizzle.team/) in the project readily setup for you. All you need to provide is a `DATABASE_URL` environment variable as seen in the `.env.example` file.
<br />
<br />
I have setup drizzle for [PostgreSQL](https://www.postgresql.org/) but you can easily change this to your database of choice. Refer to the [Drizzle ORM documentation](https://orm.drizzle.team/docs/overview) for more information.

> Will check for schema changes and generate the necessary migrations.

```bash
npm run db:generate
```

> Will run the migrations and update the database.

```bash
npm run db:migrate
```

<br />

> Will open a local GUI to view and manage your database, you can access this GUI by visiting https://local.drizzle.studio/ in your browser, pretty neat if you ask me 😎

```bash
npm run db:studio
```

---

That's all!

If you wish to make changes, please open a pull request.
