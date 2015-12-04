
###A NOTE ABOUT THIS BRANCH

This branch works with [mjj-react-scripts](https://github.com/tharsheblows/mjj-react-scripts) -- it doesn't require the individual packages itself but picks them up from that plugin. It's mainly a proof of concept at the moment because I'm not confident it will work correctly yet.

##The description

This is a WordPress plugin which makes a simple little faq. Or simple little faqs if you make more than one.

It makes a custom post type, mjj_faq, which appears as "FAQs" in the menu. You can use markup in the "answer" box for each entry. But no html tags. Those will be stripped out.

Then take the quiz!

##requirements

- [CMB2 plugin from WebDevStudios](https://github.com/WebDevStudios/CMB2) to make metaboxes
- I am not sure which version of WP is supported, but it was developed on a 4.4 beta. 
- The [WP REST API plugin](https://wordpress.org/plugins/rest-api/).  
- [mjj-react-scripts](https://github.com/tharsheblows/mjj-react-scripts)


##caveats and disclaimers

This is a work in progress and mainly a shell for something later. It's untested and I'm sure will change once I do that! Use at your own peril.

