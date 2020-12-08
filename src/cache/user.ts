import { MongooseFilterQuery, MongooseUpdateQuery } from "mongoose";
import UserModel from "../database/models/user/user.model";
import User from "../database/models/user/user.type";

export class UserCache {
    private _raw = new Map<string, User>();

    constructor() {
        this._setCache();
    }

    private async _setCache(): Promise<void> {
        const users = await UserModel.find()
        for (const u of users)
            this._raw.set(u.uId, u);
    }

    /**
     * Gets a user from the cache.
     * @param $where Either an object to filter the users by or a callback function to filter.
     */
    public get($where: UserUpdateQuery | ((value: User) => boolean)): User {
        return this.getAll($where)[0];
    }

    /**
     * Get all users from the cache.
     * @param $where Either an object to filter the users by or a callback function to filter.
     */
    public getAll($where: UserUpdateQuery | ((value: User) => boolean)): User[] {
        const arr: User[] = [];

        if (typeof $where === "function") [...this._raw].map(([_, u]) => u).filter($where).forEach((u) => arr.push(u));
        else if (typeof $where === "object") {

            for (const [__, user] of this._raw) {
                let equal: boolean = true;
                for (const key in $where) if (user[key] !== $where[key]) equal = false;
                if (equal) arr.push(user);
            }

        } else if (typeof $where === "undefined") this._raw.forEach(u => arr.push(u));

        return arr;
    }

    /**
     * Creates a user in the cache and db.
     * @param data - The data used to create the user. Type of param in UserModel.create(data) method.
     */
    public async create(data: UserCreateQuery): Promise<User> {
        const u = await UserModel.create(<any>data);
        this._raw.set(u.uId, u);
        return u;
    }

    /**
     * Updates a user in the cache and db.
     */
    public async update(user: User, updateQuery?: UserUpdateQuery): Promise<User> {
        await user.updateOne(updateQuery || user);
        this._raw.set(user.uId, user);
        return user;
    }


    /**
     * Deletes a user from the cache and the db.
     */
    public async delete(identifier: string | User): Promise<User> {
        if (typeof identifier === 'string') {
            const u = this._raw.get(identifier);
            u.deleteOne();
            this._raw.delete(identifier);
            return u;
        }
        else {
            this._raw.delete(identifier.uId);
            return await identifier.deleteOne();
        }
    }
}


export type UserCreateQuery = MongooseFilterQuery<Pick<User, keyof User>>;
export type UserUpdateQuery = MongooseUpdateQuery<Pick<User, keyof User>>;