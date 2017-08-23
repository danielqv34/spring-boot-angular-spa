package com.rest.restangular.services;

import com.rest.restangular.entities.Product;

import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: Daniel Quiroz
 * Date: 8/22/2017
 * Time: 2:31 PM
 */
public interface ProductService {

    void saveProduct(Product product);

    List<Product> listAllProducts();

    void deleteProdutc(long id);

    Product getProductById(long id);

    Product getProductByCode(String code);

    boolean productExists(Product product);
}
