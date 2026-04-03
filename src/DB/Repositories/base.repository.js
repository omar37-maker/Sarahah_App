
export class BaseRepository {

    constructor(model) { 
        this.model = model;
    }
  createDocument(data) {
      return this.model.create(data);
      
    }

    createMultipleDocuments(data) {
        return this.model.insertMany(data);
        
    }

  findOneDocument(filters, select = {}) {
    return this.model.findOne(filters).select(select);
  }

  findDocumentById(id, select = {}) {
      return this.model.findById(id).select(select);
      
    }
    
    findAllDocuments(filters, select = {}) {
        return this.model.find(filters).select(select);
        
    }
    
    // findWithPagination(filters, options) {
    // return this.model.paginate(filters, options);
    // }

    countDocuments(filters = {}) { 
        return this.model.countDocuments(filters);  
        
    }

    documentExists(filters) { 
        return this.model.exists(filters);
        
    }

    updateOneDocument(filters, updateData, options = { new: true }) {
        return this.model.findOneAndUpdate(filters, updateData, options);
        
    } 
    
    updateDocumentById(id, updateData, options = { new: true }) {
        return this.model.findByIdAndUpdate(id, updateData, options); 
    }

    updateMultipleDocuments(filters, updateData) {
        return this.model.updateMany(filters, updateData);
        
    }
    


    deleteOneDocument(filters) {
    return this.model.deleteOne(filters);
    }
    
    deleteDocumentById(id) {
        return this.model.findByIdAndDelete(id);
    }

    deleteMultipleDocuments(filters = {}) {
        return this.model.deleteMany(filters)
    }
     
    agregateDocuments(pipeline) {
        return this.model.aggregate(pipeline)
    }
}

