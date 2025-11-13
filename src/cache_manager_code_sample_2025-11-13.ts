import { Cache, caching } from 'cache-manager';

interface User {
  id: string;
  name: string;
}

async function getUserFromDB(id: string): Promise<User> {
  // Simulate database call
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ id, name: `User ${id}` });
    }, 500);
  });
}

async function main() {
  const cache: Cache = await caching('memory', {
    max: 100,
    ttl: 60 * 1000, // 60 seconds
  });

  async function getUser(id: string): Promise<User> {
    const cachedUser: User | undefined = await cache.get(`user:${id}`);

    if (cachedUser) {
      console.log(`User ${id} retrieved from cache`);
      return cachedUser;
    }

    const user = await getUserFromDB(id);
    await cache.set(`user:${id}`, user);
    console.log(`User ${id} retrieved from DB and cached`);
    return user;
  }

  const user1 = await getUser('123');
  console.log(user1);
  const user1Again = await getUser('123');
  console.log(user1Again);
  const user2 = await getUser('456');
  console.log(user2);

  await cache.del('user:123');

  const user1AfterDelete = await getUser('123');
  console.log(user1AfterDelete);
}

main();