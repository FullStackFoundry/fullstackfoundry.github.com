---
layout: page
title: Talent
icon: buildings
---
<ul>
{% for p in site.categories.tools %}
  <li>{{p.date | date: "%Y -%m-%d"}}<br /><a href="{{ p.url }}">{{ p.title }}</a></li>
{% endfor %}
</ul>