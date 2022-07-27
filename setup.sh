mkdir -p ~/.streamlit/
echo "\
[theme]
primaryColor='#7f91ef'
backgroundColor='#92a1f9'
secondaryBackgroundColor='#7f91ef'
textColor='#fbfbfb'
"
echo "\
[general]\n\
email = \"lbergaminsantos2020@gmail.com\"\n\
" > ~/.streamlit/credentials.toml
echo "\
[server]\n\
headless = true\n\
enableCORS=false\n\
port = $PORT\n\
" > ~/.streamlit/config.toml