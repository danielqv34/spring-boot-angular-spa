package com.rest.restangular.services;

import com.rest.restangular.entities.Product;
import com.rest.restangular.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: Daniel Quiroz
 * Date: 8/22/2017
 * Time: 2:33 PM
 */
@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void saveProduct(Product product) {
        productRepository.save(product);
    }

    @Override
    public List<Product> listAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public void deleteProdutc(long id) {
        if (id != 0) {
            productRepository.delete(id);
        }
    }

    @Override
    public Product getProductById(long id) {
        return productRepository.getOne(id);
    }

    @Override
    public Product getProductByCode(String code) {
        return productRepository.findByCode(code);
    }

    @Override
    public boolean productExists(Product product) {
        return productRepository.findByCode(product.getCode()) != null;
    }
}
