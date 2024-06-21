# discord-typescript

> [Discord.js](https://discord.js.org/) is the 'most popular way to build Discord bots'.

This template allows you to write your own bot with complete type safety before compiling to JavaScript. To use this repository, you can either use [GitHub Templates](https://docs.github.com/en/issues/planning-and-tracking-with-projects/creating-projects/copying-an-existing-project) or clone this repository.

## Tech Stack
- [Typescript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en/)
- [Discord.js](https://discord.js.org/)
- [Postgres.js](https://github.com/porsager/postgres)
- [Zod](https://zod.dev/)
- [PostgresSQL](https://www.postgresql.org/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Docker](https://www.docker.com/)

---

### Cloning this repository

Before you can start using this template, you'll need to have both [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/en/) installed on your machine.

#### 1. Clone this repository

You'll need [Git](https://git-scm.com/) to do this.

```bash
git clone https://github.com/jakemackie/discord-typescript
```

Now, let's enter the directory we just created.

```bash
cd discord-typescript
```

#### 2. Install the dependencies

You'll need [Node.js](https://nodejs.org/en/) to do this.

```bash
npm install
```

#### 3. Get your bot token

You'll need to get your bot token from the [Discord Developer Portal](https://discord.com/developers/applications). If you've never done this before, you can follow the [official guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot) to create a new bot.

Once you've created your bot and gotten your token, you can add it to a `.env` file in the root of your project. If you've followed up until this point, you'll notice there is not a `.env` file in the root of the project. This is to keep both you and I safe when making public changes to the project that may contain sensitive information.
<br />
<br />
Create yourself a `.env` file and add your token to it. The `.env.example` file in the root of the project shows you what your file should look like.

#### 4. Run the bot

You made it this far! Now, I have provided multiple ways to run your bot. As you are writing in Typescript there are a few options available to you.

Development (doesn't require `build` step, not recommended for production)

```bash
npm run dev
```

Build (compiles to JavaScript)

```bash
npm run build
```

Start (requires `build` step, recommended for production)

```bash
npm start
```

#### 5. Database setup

If you want to use a Database with your bot, I've included [Drizzle ORM](https://orm.drizzle.team/) in the project readily setup for you. All you need to provide is a `DATABASE_URL` environment variable as seen in the `.env.example` file.
<br />
<br />
I have set up drizzle for [PostgresSQL](https://www.postgresql.org/) but you can easily change this to your database of choice. Refer to the [Drizzle ORM documentation](https://orm.drizzle.team/docs/overview) for more information.

Will check for schema changes and generate the necessary migrations.

```bash
npm run db:generate
```

Will run the migrations and update the database.

```bash
npm run db:migrate
```

Will open a local GUI to view and manage your database, you can access this GUI by visiting https://local.drizzle.studio/ in your browser, pretty neat if you ask me 😎

```bash
npm run db:studio
```

---

### Containing with Docker

> The `DATABASE_URL` environment variable assumes you are using an accessible PostgresSQL database, and not a local database.

If you wish to run this bot in a container, you can use the provided `Dockerfile` to do so. Assuming you have [Docker](https://www.docker.com/) installed on your machine as well as some understanding of how to use it, you can build the container by running the following command:

Make sure you are in the root of the project before running any of the following commands.

#### 1. Build the image

Docker will build the container from the `Dockerfile` in the root of the project, I have configured this file for you, you can change the image name if you wish to.

Will build the image and tag it as `discord-typescript`.

```bash
docker build -t discord-typescript .
```

#### 2. Run the image in a container

Now that the image is built, you can run it in a container. Please note that if you gave the image a different name, you will need to change the name in the command below.

Will run the container and start the bot application.

```bash
docker run discord-typescript
```

The container will run in the background and run your bot application. This is a great way to run the bot application and keep resources low on your machine/vps.

---

That's all!

If you wish to make changes, please open a pull request.
