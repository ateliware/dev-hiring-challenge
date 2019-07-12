package br.com.ateliware.challenge.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import br.com.ateliware.challenge.type.Language;
import lombok.Builder;
import lombok.Data;

@Entity
@Data
@Builder
public class GitHubRepository {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
	private String description;
	private String homepage;
	private String name;
	private String full_name;
	private String html_url;
	private String license;
	private String git_url;
	private String owner;
	private int forks_count;
	private int stargazers_count;
	private int watchers_count;
	private int size;
	private int open_issues_count;
	private int subscribers_count;
	private String pushed_at;
	private String default_branch; 
	private Language language;
 
}
