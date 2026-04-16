
export class BaseRepository {

    constructor(model) { 
        this.model = model;
    }
  createDocument(data) {
      return this.model.create(data);
      
    }

  findOneDocument(filters, select = {}) {
    return this.model.findOne(filters).select(select);
  }

  findDocumentById(id) {
      return this.model.findById(id);
      
    }
    
    findDocuments(filters) {
        return this.model.find(filters);
        
    }


    updateDocument({ filters, data, options }) {
        return this.model.updateOne(filters, data, options);
        
    } 
    
    updateWithFindOne({ filters, data, options }) {
       return this.model.findOneAndUpdate(filters, data, options)
   }

    updateWithFindById({ id, data, options }) {
        return this.model.findByIdAndUpdate(id, data, options)
        
    }

    updateManyDocument({ filters, data, options }) {
        return this.model.updateMany(filters, data, options)
    }
    


    deleteDocument(filters) {
    return this.model.deleteOne(filters);
    }

    deleteManyDocumnets({ filters }) {
        return this.model.deleteMany(filters)
    }
    
    deletAll() {
       return this.model.deleteMany({})
   }

    deleteWithFindOne({ filters }) {
        return this.model.findOneAndDelete(filters)
    }

    deleteWithFindById(id) {
        return this.model.findByIdAndDelete(id)
    }

    countDocuments(filters) {
        return this.model.countDocuments(filters)
    }
}

