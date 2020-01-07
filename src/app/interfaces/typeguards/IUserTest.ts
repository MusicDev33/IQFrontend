import { IUser } from '@interfaces/schemas/IUser';
import { User } from '@classes/user';

// This is testing to see if I can automatically generate missing properties.
// This is a possible alternative to schema versioning.

function toIUser(user: any): IUser{
  if (propertyCheckIUser(user)) {
    return user;
  } else {
    return updateUser(user);
  }
}

function propertyCheckIUser(user: any): boolean {
  const testProperties = Object.keys(new User());
  const userProperties = Object.keys(user);

  if (userProperties.sort().join('.') !== testProperties.sort().join('.')) {
    return false;
  } else {
    return true;
  }
}

function getMissingProperties(user: any) {
  const testProperties = Object.keys(new User());
  let difference = testProperties.filter(x => Object.keys(user).indexOf(x) <= -1);
  return difference;
}

function updateUser(user: any): IUser {
  const testUser: any = new User();
  for (let property of getMissingProperties(user)) {
    user[property] = testUser[property];
  }
  return user;
}

export { toIUser };
