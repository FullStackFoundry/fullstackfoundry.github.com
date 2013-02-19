---
layout: page
title: Events
icon: buildings
---
<ul class="articles-list">
{% for p in site.categories.events %}
    <li>
        <p class="date">{{ p.date | date: "%B %d, %Y" }}</p><p class="title"><a href="{{ p.url }}">{{ p.title }}</a> (<a href="{{p.link}}">{{p.organizer}}</a>)</p>
   </li>
{% endfor %}
</ul>