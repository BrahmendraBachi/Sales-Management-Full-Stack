package com.example.SalesBackend.Model;

import javax.persistence.*;


@Entity
@Table(name = "productsold")
public class ProductSold {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "productId")
    private String productId;

    @Column(name = "empId")
    private String empId;

    @Column(name = "typeId")
    private String typeId;

    @Column(name = "dateSold")
    private String dateSold;

    @Column(name = "cost")
    private Long cost;


    public Long getCost() {
        return cost;
    }

    public void setCost(Long cost) {
        this.cost = cost;
    }

    public ProductSold()
    {
        super();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getEmpId() {
        return empId;
    }

    public void setEmpId(String empId) {
        this.empId = empId;
    }

    public String getDateSold() {
        return dateSold;
    }

    public String getTypeId() {
        return typeId;
    }

    public void setTypeId(String typeId) {
        this.typeId = typeId;
    }

    public void setDateSold(String dateSold) {
        this.dateSold = dateSold;
    }
}
