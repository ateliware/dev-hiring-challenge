package br.com.ateliware.challenge.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import br.com.ateliware.challenge.type.Language;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GitHubRepository {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long     id;
    @Column(length = 20480)
    private String   description;
    @Column(length = 2048)
    private String   homepage;
    private String   name;
    private String   fullName;
    private String   license;
    private int      forksCount;
    private int      stargazersCount;
    private int      watchersCount;
    private int      size;
    private int      openIssuesCount;
    private int      subscribersCount;
    private Date     pushedAt;
    private String   defaultBranch;
    private Language language;

}
