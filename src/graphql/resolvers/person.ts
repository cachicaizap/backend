import { IResolvers } from 'graphql-tools' 
import data from '../../data/data.json'
import { Db, ObjectId } from 'mongodb'
import { DEVELOPERS_COLLECTION, GAMES_COLLECTION } from '../../mongo/collections'

export const personResolver: IResolvers = {
    Query: {
        getPerson(root: void, args: any){
            const [found] = data.people.filter(p => p._id === args._id)

            console.log(found)
            return found
        }
    },
    Person: {
        __resolveType(obj: any){
            return obj.age ? 'Male' : 'Female'
        }
    }
}