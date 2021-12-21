import { IResolvers } from 'graphql-tools'
import { Db, ObjectId } from 'mongodb'
import data from '../../data/data.json'
import { CHARACTERS_COLLECTION, GAMES_COLLECTION } from '../../mongo/collections'

export const characterResolver: IResolvers = {
    Query: {
        async getCharacters(root: void, args: void, context: Db) {
            try {
                return await context.collection(CHARACTERS_COLLECTION).find().toArray()
            } catch (error) {
                console.log(error)
            }
        },
        async getCharacter(root: void, args:any, context: Db){
            try {
                const found = await context.collection(CHARACTERS_COLLECTION).findOne({ _id: new ObjectId(args._id) })
                return found
            } catch (error) {
                console.log(error)
            }
        }
    },
    Mutation: {
        async createCharacter(root: void, args: any, context: Db){
            try {
                const regexp = new RegExp(args.character.name, 'i')
                const exists = await context.collection(CHARACTERS_COLLECTION)
                .findOne({ name: regexp })

                if(exists){
                    return 'Character already exists'
                }
                await context.collection(CHARACTERS_COLLECTION).insertOne(args.character)
                return "Character added succesfull"
            } catch (error) {
                console.log(error)
            }
        },
        async editCharacter(root: void, args: any, context: Db){
            try {
                const exists = await context.collection(CHARACTERS_COLLECTION)
                .findOne({ _id: new ObjectId(args._id) })

                if(exists){
                    await context.collection(CHARACTERS_COLLECTION)
                    .updateOne(
                        { _id:new ObjectId(args._id)},
                        { $set: args.character}
                    )
                }else{
                    return 'Character does not exists'
                }

                return 'Character updated'
            } catch (error) {
                console.log(error)
            }
        }
    },
    Character: {
        async games(parent: any, args: void, context: Db){
            const gameList= parent.games.map(async (gameid: string) => {
                return await context.collection(GAMES_COLLECTION).findOne({ _id: new ObjectId(gameid) })
            })

            return gameList
        }
    }
}