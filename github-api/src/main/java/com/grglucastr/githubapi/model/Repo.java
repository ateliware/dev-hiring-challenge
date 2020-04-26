package com.grglucastr.githubapi.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;


@Table(name = "repos")
@Entity
@Getter
@Setter
public class Repo implements Serializable {


    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "se_repos")
    @SequenceGenerator(name="se_repos", sequenceName = "se_repos", allocationSize = 1)
    private Integer id;

    private String name;
    private String url;
    private String language;
    private String description;

}
