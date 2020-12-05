import { MongooseFilterQuery, MongooseUpdateQuery } from "mongoose";
import UserModel from "../database/models/user/user.model";
import User from "../database/models/user/user.type";

export class UserCache {
    private _raw: Map<string, User>;

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
     */
    public get(uId?: string): User {
        return this._raw.get(uId);
    }

    /**
     * Creates a user in the cache and db.
     * @param data - The data used to create the user. Type of param in UserModel.create(data) method.
     */
    public async create(data: UserCreateQuery): Promise<User> {
        const u = await UserModel.create(data);
        this._raw.set(u.uId, u);
        return u;
    }

    /**
     * Updates a user in the cache and db.
     * If a user object is passed then that will be updated instead of one that's already in the cache.
     */
    public async update(id: string, updateQuery: UserUpdateQuery, getQuery?: UserGetQuery, user?: User): Promise<User> {
        let u: User;
        if (user) u = await user.updateOne(updateQuery);
        else u = await this._raw.get(<string>getQuery.uId).update(getQuery, updateQuery);

        this._raw.set(u.uId, u);
        return u;
    }


    /**
     * Deletes a user from the cache and the db.
     */
    public async delete(uId: string): Promise<User> {
        this._raw.delete(uId);
        return await this._raw.get(uId).deleteOne();
    }
}


export type UserCreateQuery = Pick<{
    _id: any;
    uId: string;
    prestige?: string | number;
    balance?: string | number;
    stores?: any[];
} & {
    _id: any;
}, "uId" | "prestige" | "balance" | "stores"> & {
    _id?: any;
}

export type UserUpdateQuery = MongooseUpdateQuery<Pick<User, "_id" | "uId" | "prestige" | "balance" | "stores">>
export type UserGetQuery = MongooseFilterQuery<Pick<User, "_id" | "uId" | "prestige" | "balance" | "stores">>