import CrudRepository from './CrudRepository';
import { Document } from "mongoose";
import { NewsModel, News } from './News';

export default class UserRepository extends CrudRepository<NewsModel & Document> {
    constructor () {
        super(News);
    }
}
