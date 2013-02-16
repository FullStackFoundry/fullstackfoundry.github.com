---
layout: page
title: News
icon: buildings
---
<ul>
{% for p in site.categories.news %}
  <li>{{p.date | date: "%Y -%m-%d"}}<br /><a href="{{ p.url }}">{{ p.title }}</a></li>
{% endfor %}
</ul>