package com.rest.restangular.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

/**
 * Created by IntelliJ IDEA.
 * User: Daniel Quiroz
 * Date: 8/22/2017
 * Time: 2:04 PM
 */
@Entity
@Table(name = "PRODUCT")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "CODE", unique = true)
    private String code;
    @Column(name = "PRODUCT_NAME", unique = true)
    private String productName;
    @Column(name = "DESCRIPTION")
    private String description;
    @Column(name = "PRICE")
    private double price;
    @Column(name = "IMAGE")
    private String image;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
