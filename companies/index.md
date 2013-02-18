---
layout: page
title: Companies
icon: buildings
---

<ul class="companies-list">
    {% for c in site.categories.companies %}
    <li>
        <h3><a href="{{ c.website }}" target="_blank"><img src="{{ c.logo }}" class="company-logo" /></a>{{ c.title }}</h3>
        {{ c.content }}
    </li>
    {% endfor %}
</ul>