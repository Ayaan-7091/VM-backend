const Category = require('../models/category.model')
const Product = require('../models/product.model')


async function createProduct(reqData){

    let topLevel = await Category.findOne({name:reqData.topLevelCategory})

    if(!topLevel){
       topLevel =new Category({
            name:reqData.topLevelCategory,
            level:1
        })

        await topLevel.save()
    }

    let secondLevel = await Category.findOne({name:reqData.secondLevelCategory,parentCategory:topLevel._id})

    if(!secondLevel){
        secondLevel = new Category({
            name:reqData.secondLevelCategory,
            parentCategory:topLevel._id,
            level:2
        })

        await secondLevel.save()
    }

    let thirdLevel = await Category.findOne({name:reqData.thirdLevelCategory,parentCategory:secondLevel._id})

    if(!thirdLevel){
        thirdLevel = new Category({
            name : reqData.thirdLevelCategory,
            parentCategory:secondLevel._id,
            level:3
        })

        await thirdLevel.save()
    }

    const product = new Product({
        title:reqData.title,
        brand:reqData.brand,
        description:reqData.description,
        specifications:reqData.specifications,
        discountedPrice:reqData.discountedPrice,
        discountPresent:reqData.discountPresent,
        price:reqData.price,
        quantity:reqData.quantity,
        category:thirdLevel._id,
        variants: reqData.variants
    })

    return await product.save()
}

async function deleteProduct(productId){

    const product = await findProductById(productId)
    await Product.findByIdAndDelete(product._id)
    return("Product deleted successfully")
}

async function updateProduct(productId,reqData){
    return await Product.findByIdAndUpdate(productId,reqData)
}

async function findProductById(productId){
    const product = await Product.findById(productId).populate('category').exec()

    if(!product){
        throw new Error("Product not found with ID : ",productId)
    }

    return product
}

async function getAllProducts(reqQuery) {
    let { category, brand, minPrice, maxPrice, sort, stock, pageNumber, pageSize } = reqQuery;

    pageNumber = parseInt(pageNumber, 10) || 1; // Default to 1 if undefined or NaN
    pageSize = parseInt(pageSize, 10) || 10; // Default to 10 if undefined or NaN

    let query = Product.find().populate('category');

    // Handle Category Filter
    if (category) {
        const existCategory = await Category.findOne({ name: category });
        if (existCategory) {
            query = query.where("category").equals(existCategory._id);
        } else {
            return { content: [], currentPage: 1, totalPages: 0 };
        }
    }

    //hnadle brand filter
    if (brand) {
        query = query.where("brand").equals(brand);
    }

  
//    // Handle Color Filter
// if (color && color !== "undefined") {
//     const colorSet = new Set(color.split(",").map(color => color.trim().toLowerCase()));
//     const colorRegex = colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;
//     if (colorRegex) {
//         query = query.where("color").regex(colorRegex);
//     }
// }


//     // Handle Size Filter
//     if (sizes && sizes !== "undefined") {
//         const sizeSet = new Set(sizes.split(",").map(size => size.trim().toLowerCase()));
//         if (sizeSet.size > 0) {
//             query = query.where("sizes.name").in([...sizeSet]);
//         }
//     }

    // Handle Price Filter
    if (minPrice !== undefined && maxPrice !== undefined) {
        const parsedMinPrice = parseFloat(minPrice);
        const parsedMaxPrice = parseFloat(maxPrice);
        if (!isNaN(parsedMinPrice) && !isNaN(parsedMaxPrice)) {
            query = query.where('discountedPrice').gte(parsedMinPrice).lte(parsedMaxPrice);
        }
    }

    // Handle Stock Filter
    if (stock && stock !== "null") {
        if (stock === "in_stock") {
            query = query.where("quantity").gt(0);
        } else if (stock === "out_of_stock") {
            query = query.where("quantity").lte(0);
        }
    }

    // Handle Sorting
    if (sort) {
        const sortDirection = sort === "price_high" ? -1 : 1;
        query = query.sort({ discountedPrice: sortDirection });
    }

    // Calculate total products and pages
    const totalProducts = await Product.countDocuments(query);
    const skip = (pageNumber - 1) * pageSize;

    // Apply pagination
    query = query.skip(skip).limit(pageSize);

    // Execute the query
    const products = await query.exec();

    const totalPages = Math.ceil(totalProducts / pageSize);

    return { content: products, currentPage: pageNumber, totalPages };
}


async function createMultipleProduct(products){
    for(let product of products){
        await createProduct(product)
    }
}

module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    createMultipleProduct,
    getAllProducts,
    findProductById
}