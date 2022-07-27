import streamlit as st
import sqlite
import requests


def show_elements(type_select, value):
    for element in value:
        if type_select == 'sqlite':
            st.sidebar.markdown(f"<h5 style='text-align: center; color: #fff;'>Nome -> {element[0]}</h5>",
                                unsafe_allow_html=True)
            st.sidebar.markdown(f"<h5 style='text-align: center; color: #fff;'>Descrição -> {element[1]}</h5>",
                                unsafe_allow_html=True)
            st.sidebar.markdown(f"<h5 style='text-align: center; color: #fff;'>URL -> {element[2]}</h5>",
                                unsafe_allow_html=True)
            st.sidebar.markdown(f"<h5 style='text-align: center; color: #fff;'>URL -> {element[3]}</h5>",
                                unsafe_allow_html=True)
            st.sidebar.markdown(f"<h5 style='text-align: center; color: #fff;'>Linguaguem -> {element[4]}</h5>",
                                unsafe_allow_html=True)
            st.sidebar.markdown(f"<h5 style='text-align: center; color: #fff;'>Criado em -> {element[5]}</h5>",
                                unsafe_allow_html=True)
            st.sidebar.markdown(f"<h5 style='text-align: center; color: #fff;'>Estelas -> {element[6]}</h5>",
                                unsafe_allow_html=True)
            st.sidebar.markdown(f"<h5 style='text-align: center; color: #fff;'>Forks -> {element[7]}</h5>",
                                unsafe_allow_html=True)
            st.sidebar.markdown(
                f"<h5 style='text-align: center; color: #fff;'>---------------------------------------------------------------------</h5>",
                unsafe_allow_html=True)
        else:
            sqlite.insert(element['name'], element['description'], element['html_url'], element['owner']['login'],
                          element['language'].lower(), element['created_at'], element['watchers'], element['forks_count'])

            st.markdown(f"<h5 style='text-align: center; color: #fff;'>Nome -> {element['name']}</h5>",
                                unsafe_allow_html=True)
            st.markdown(f"<h5 style='text-align: center; color: #fff;'>Descrição -> {element['description']}</h5>",
                                unsafe_allow_html=True)
            st.markdown(f"<h5 style='text-align: center; color: #fff;'>URL -> {element['html_url']}</h5>",
                                unsafe_allow_html=True)
            st.markdown(f"<h5 style='text-align: center; color: #fff;'>Criador -> {element['owner']['login']}</h5>",
                                unsafe_allow_html=True)
            st.markdown(f"<h5 style='text-align: center; color: #fff;'>Linguaguem -> {element['language']}</h5>",
                                unsafe_allow_html=True)
            st.markdown(f"<h5 style='text-align: center; color: #fff;'>Criado em -> {element['created_at']}</h5>",
                                unsafe_allow_html=True)
            st.markdown(f"<h5 style='text-align: center; color: #fff;'>Estelas -> {element['watchers']}</h5>",
                                unsafe_allow_html=True)
            st.markdown(f"<h5 style='text-align: center; color: #fff;'>Forks -> {element['forks_count']}</h5>",
                                unsafe_allow_html=True)
            st.markdown(
                f"<h5 style='text-align: center; color: #fff;'>---------------------------------------------------------------------</h5>",
                unsafe_allow_html=True)


sqlite.create_table()

st.markdown("<h1 style='text-align: center; color: #fff;'>GITHUB</h1>", unsafe_allow_html=True)
st.markdown("<p style='text-align: center; color: #fff;'>Para visualizar o historico de pesquisas aperte no menu lateral</p>", unsafe_allow_html=True)

word_repository = st.text_input("Por favor, informe uma palavra para ser pesquisada nos repositorios")
language = st.text_input("Por favor, informe uma linguaguem")

if st.button('Buscar'):
    if word_repository == '' or language == '':
        st.write("Por favor, complete os campos acima")
    else:
        show_elements('', requests.get(f"https://api.github.com/search/repositories?q='{word_repository}'+language:'{language}'&per_page=5").json()['items'])

st.sidebar.markdown("<h1 style='text-align: center; color: #fff;'>Historico</h1>", unsafe_allow_html=True)
st.sidebar.markdown("<p style='text-align: center; color: #fff;'>Caso deseje procurar no historico por alguma linguaguem especifica basta escrever ela na barra de pesquisa abaixo, caso deseje ver todo o historico basta clicar diretamente no botão 'Mostrar Historico' ou caso deseje limpar o historico basta escrever a linguaguem especifica e apertar em 'Limpar historico' ou então aperte direto e limpara todo historico</p>", unsafe_allow_html=True)
language_specific = st.sidebar.text_input("")

if st.sidebar.button("Limpar historico"):
    if language_specific == '':
        sqlite.delete()
    else:
        sqlite.delete_where(language_specific)

if st.sidebar.button("Mostrar Historico"):
    if language_specific == '':
        show_elements('sqlite', sqlite.select())
    else:
        show_elements('sqlite', sqlite.select_where(language_specific))






