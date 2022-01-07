import { IResolvers } from 'graphql-tools' 
import data from '../../data/data.json'
import { Db, ObjectId } from 'mongodb'
import { DEVELOPERS_COLLECTION, GAMES_COLLECTION } from '../../mongo/collections'

export const personResolver: IResolvers = {
    Query: {
        getPerson(root: void, args: any){
            const [found] = data.people.filter(p => p._id === args._id)
            return found
        }
    },
    Person: {
        __resolveType(obj: any){
            return obj.age ? 'Male' : 'Female'
        }
    },
    Male: {
        countries(parent: any){
            const countries : any = []
            parent.countries.forEach((countryId: any) =>
                countries.push(...data.countries.filter(c => c._id === countryId))
            )
            data.countries.filter(c => console.log(c.name))
            return countries
        }
    },
    Country:{
        people(parent: any){
            const chars : any = []
            parent.people.array.forEach((charId: any) => {
                chars.push(... data.people.filter(c => c._id === charId))
            });
            return chars
        }
    }
}