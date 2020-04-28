package com.grglucastr.githubapi.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

import com.grglucastr.githubapi.service.RepoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import com.google.gson.JsonObject;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
public class RepoControllerTests {

    private RepoService repoService;
    private MockMvc mockMvc;
    private ModelMapper modelMapper;

    @BeforeEach
    public void setUp(){
        repoService = Mockito.mock(RepoService.class);
        modelMapper = new ModelMapper();
        mockMvc  = MockMvcBuilders.standaloneSetup(new RepoController(repoService, modelMapper)).build();
    }

    @Test
    public void testListAll() throws Exception {
        mockMvc.perform(get("/api/repos"))
                .andExpect(status().isOk());
    }

    @Test
    public void testPostRepo() throws Exception {

        JsonObject json = new JsonObject();
        json.addProperty("name", "test");
        json.addProperty("description", "test");
        json.addProperty("url", "test");
        json.addProperty("language", "test");

        mockMvc.perform(
                post("/api/repos")
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8")
                .content(json.toString()))
                .andDo(print())
                .andExpect(status().isCreated());
    }

    @Test
    public void testDeleteRepos() throws Exception {
        mockMvc.perform(delete("/api/repos")).andExpect(status().isNoContent());
    }
}
