---
layout: page
title: News
icon: buildings
---
<ul class="articles-list">
{% for p in site.categories.news %}
    <li>
        <p class="date">{{ p.date | date: "%B %d, %Y" }}</p><p class="title"><a href="{{ p.url }}">{{ p.title }}</a></p>
   </li>
{% endfor %}
</ul>