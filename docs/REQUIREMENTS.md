# Antai Requirements

## 1. Vision

`Antai` should be a simple, powerful antkeeping companion.

It should help users:

- manage their colonies
- keep a clear history of colony life
- receive reminders for care tasks
- consult species knowledge
- use AI to better understand their colonies
- connect nest monitoring and automation tools

The product should feel dedicated to antkeepers, not like a generic admin tool.

## 2. Product Principles

`Antai` should always favor:

- simplicity
- clarity
- ease of use
- ease of installation
- ease of maintenance
- easy understanding for both users and maintainers

When two solutions provide the same result, the simplest and clearest one should be preferred.

## 3. Target Users

`Antai` should serve:

- beginners who need guidance and reminders
- experienced antkeepers who need structured tracking and deeper analysis
- community-oriented users who want to explore species knowledge, swarm activity, and antkeeping content

## 4. Simplicity Constraints

The application should be as easy as possible to install, update, and manage.

The ideal usage model is:

- drop the application files into a folder
- open it in a web browser
- start using it with little or no complex setup

The product should aim for:

- minimal installation effort
- minimal dependencies
- minimal configuration
- minimal maintenance effort
- simple updates
- easy backup and restore

The experience should remain approachable even for non-expert users or lightweight self-hosters.

## 5. Project Organization Constraints

The project should remain easy to understand and manage.

Its organization should:

- fit naturally with normal GitHub repository usage
- be easy to browse on GitHub
- follow good practices of the chosen development languages
- avoid unnecessary complexity
- avoid confusing or overly fragmented structure
- stay approachable for future contributors and maintainers

The project should favor:

- clear naming
- predictable folders
- readable code and content structure
- easy onboarding for a new developer or maintainer

## 6. Core User Features

### 6.1 Accounts

Users should be able to:

- create an account
- log in
- log out
- verify their email after signup
- view their profile
- choose whether they want newsletters
- sign up or sign in with Google or another simple social login option

### 6.2 Colony Management

Users should be able to:

- create multiple ant colonies
- give each colony a name
- assign a species
- specify the number of queens
- record the start or acquisition date
- track general colony status
- write colony notes
- add one or more colony photos
- edit colony information later
- archive inactive colonies
- browse a list of colonies
- open a detailed page for each colony

The colony area should help users quickly understand:

- which colonies they own
- how each colony is evolving
- which colonies need attention

### 6.3 Colony Journal

Each colony should include a timeline or journal.

Users should be able to:

- add dated events
- write notes for each event
- attach photos to events
- browse events in chronological order
- filter past events
- search past events

Common event types should include:

- feeding
- cleaning
- observation
- health issue
- migration or move
- worker count update
- brood update
- setup change

### 6.4 Reminders

Users should be able to:

- create reminders linked to a colony
- create reminders not linked to a colony
- set dates and times
- repeat reminders
- receive notifications
- mark reminders as done
- postpone or snooze reminders

Reminder use cases should include:

- feeding
- cleaning
- humidity check
- temperature check
- brood observation
- moving a colony
- replacing water or food

### 6.5 Species and Care Sheets

Users should be able to:

- consult care sheets
- search species information
- browse species profiles
- link a colony to a known species
- save useful species pages

Each species page should help users understand:

- origin or native region
- founding type
- expected temperature
- expected humidity
- diet and feeding advice
- temperament or aggression
- growth expectations
- practical care notes

The product should also support:

- unknown species
- broader genus or species-group identification when exact recognition is not possible

### 6.6 Colony Tracking Details

Users should be able to track:

- queen count
- worker count
- brood presence
- colony activity
- food preferences
- setup notes
- health observations

### 6.7 Photos and Visual History

Users should be able to:

- upload colony photos
- upload colony videos
- upload event photos
- upload event videos
- download colony photos
- download colony videos
- download event photos
- download event videos
- view colony media in galleries
- view event media in galleries
- organize or consume videos in playlists
- build a visual history of colony evolution
- review older colony photos over time

Photos should help users document:

- brood development
- worker growth
- setup changes
- health issues
- queen condition

Pictures and movies should be treated as part of the colony memory and remain accessible to the user over time.

The media experience should allow users to browse visual content either as:

- galleries for pictures and mixed media
- playlists for video sequences or ordered visual follow-up

### 6.8 Colony Map and Zone Monitoring

Users should be able to create a map of their colony, nest, or setup.

The map feature should allow users to:

- create one or more maps for a colony
- define zones inside a map
- name zones
- describe zones
- visually place zones on the map
- update zone definitions over time

Users should be able to link media to map zones, including:

- galleries linked to a zone
- playlists linked to a zone
- photos linked to a zone
- videos linked to a zone

Users should also be able to link sensor information or actions to zones, including:

- temperature values
- humidity values
- camera streaming
- domotic status values
- domotic actions
- other useful connected measurements or controls

The map should help users understand:

- where observations were made
- which part of the nest is being monitored
- which sensors or automations belong to which area
- how one zone evolves over time compared with another

Antai should also record sensor values over time so users can review the history of each zone and colony environment.

Recorded sensor history should be usable as:

- readable history inside the web interface
- data that can be used by AI recommendations
- data that can be consulted from LLM CLI or conversational integrations

### 6.9 Dashboard

Users should have a clear overview screen.

The dashboard should show:

- active colonies
- upcoming reminders
- overdue care tasks
- recent colony events
- quick access to species information

The dashboard should help users know what needs attention immediately.

## 7. AI Features

### 7.1 AI Assistant

The product should include an AI assistant for colony understanding and advice.

Users should be able to:

- ask questions about a specific colony in natural language
- request a summary of recent colony evolution
- receive recommendations based on colony history
- receive warnings when data suggests a possible problem
- ask what actions are recommended next

Examples of useful questions include:

- "What changed in this colony during the last 30 days?"
- "Why is this colony slowing down?"
- "What should I check if brood development has stopped?"
- "What should I do next for this colony?"
- "Summarize this colony for another breeder or a buyer."

The assistant should help users:

- understand their own data more easily
- detect patterns they may have missed
- get practical and contextual advice

### 7.2 AI Image Analysis

Users should be able to use photos for AI-powered help.

The product should support features such as:

- species recognition from a picture
- uncertain-species recognition help
- ant count estimation from a picture
- brood presence detection
- queen visibility detection when possible
- visual detection of possible setup issues

Examples include:

- estimating visible workers
- recognizing eggs, larvae, or cocoons
- highlighting possible mold, dryness, debris, or unusual visual signs
- comparing older and newer photos to detect change

### 7.3 Smart Insights

The product should transform colony history into useful insights.

Users should be able to receive:

- growth trend summaries
- care consistency summaries
- feeding habit summaries
- reminder completion summaries
- health risk alerts
- anomaly alerts when something changes unexpectedly

Examples include:

- low activity despite recent feeding
- repeated missed care actions
- no visible brood evolution for an unusual period
- visible drop in population

## 8. Connected Nest and Automation Features

### 8.1 Sensor Monitoring

The product should support connected nest monitoring.

Users should be able to:

- view nest sensor data inside the app
- link sensors to a specific colony or nest
- track temperature and humidity automatically
- view sensor history
- receive alerts when values move outside the expected range
- trigger reminders from sensor events

### 8.2 Home Automation Connectors

The product should support connections with open-source domotic ecosystems such as:

- Home Assistant
- Jeedom
- Domoticz

### 8.3 Nest Automation

Users should be able to automate nest-related actions such as:

- heating control
- humidity management
- lighting schedules
- ventilation control
- water refill alerts

### 8.4 Environment-Based Recommendations

The product should help users combine manual observations and sensor measurements.

Users should be able to receive guidance such as:

- humidity lower than expected for this species
- temperature higher than recommended during part of the day
- change in colony activity after a change in environment

## 9. LLM Integration Features

`Antai` should be able to work with major LLM ecosystems.

The product should be usable:

- inside ChatGPT through a plugin-style or integrated graphical experience
- inside Gemini through a plugin-style or integrated graphical experience
- inside Claude through a plugin-style or integrated graphical experience
- directly from LLM CLI workflows

The product should allow users to:

- query colony information from an LLM interface
- request summaries, recommendations, and analysis from an LLM interface
- send colony data, images, or sensor context into an LLM-assisted workflow
- receive structured answers that remain useful in both graphical and CLI contexts

The integration experience should stay simple and understandable.

Users should be able to treat `Antai` as:

- a standalone product
- a companion tool connected to conversational AI
- a tool that can be called directly from LLM-driven command-line workflows

All user data managed by the product should remain readable through:

- the `Antai` web interface
- LLM CLI workflows connected to `Antai`

This should apply to the main functional data of the product, including:

- colony information
- colony journal history
- reminders
- species and care sheet content
- photos and image-related results when available
- sensor and automation-related information when available
- AI-generated summaries or recommendations when they are stored

Users should not feel locked into only one access mode.

The same useful information should remain accessible whether the user works:

- in the graphical web interface
- in a conversational AI integration
- in a CLI-based LLM workflow

## 10. Knowledge and Community Features

### 10.1 Swarm Map

Users should be able to:

- report a swarm or nuptial flight sighting
- browse sightings shared by others
- add a location
- add a date
- add notes
- add an optional photo
- indicate the species if known

The swarm map should help users:

- discover swarming activity nearby
- follow seasonal activity
- learn from community observations

### 10.2 News and Educational Content

Users should be able to:

- read antkeeping news
- browse educational content
- open featured content directly from the app

Content should include topics such as:

- husbandry advice
- species behavior
- beginner guidance
- seasonal activity
- research or discoveries
- setup and equipment tips

### 10.3 Community-Oriented Features

The product should support a stronger community feeling through features such as:

- swarm map participation
- access to news
- useful partner or recommended resources
- optional newsletters

Later community features may include:

- private messaging
- shared observations
- public colony showcases

## 11. Adaptive Interface

The interface should adapt clearly to different screen sizes and contexts.

Users should be able to use the product comfortably on:

- smartphone
- tablet
- TV
- laptop
- desktop

The experience should adapt by device:

- on smartphone, quick actions, reminders, photo capture, and colony updates should be prioritized
- on tablet, colony review, journals, and reading should be more spacious
- on TV, passive views such as dashboard, alerts, sensor status, and slideshows should be possible
- on laptop and desktop, detailed management, filtering, and long-form consultation should be comfortable

Users should be able to:

- switch devices without losing clarity
- access the same core information everywhere
- use layouts that feel natural for touch, keyboard, mouse, or remote-style navigation

## 12. Beginner and Advanced Value

### 12.1 Beginner-Friendly Experience

The product should support beginners with:

- simple explanations
- easy navigation
- practical care guidance
- accessible species sheets
- helpful reminders

New users should feel that the app helps them start safely and confidently.

### 12.2 Advanced User Value

The product should also serve experienced antkeepers with:

- management of many colonies
- deeper journal history
- species-specific tracking
- richer notes
- structured observation habits
- sensor-linked monitoring
- automation-assisted care
- AI-assisted colony review

## 13. Scope

### 13.1 Minimum Feature Scope

The first version should include:

- signup and login
- profile
- multiple colony management
- colony notes and photos
- colony journal
- reminders
- species care sheets

### 13.2 Extended Feature Scope

Later versions should expand with:

- Google signup
- AI colony assistant
- AI photo recognition
- AI ant counting
- AI care recommendations
- ChatGPT integration
- Gemini integration
- Claude integration
- LLM CLI usage
- sensor integrations
- nest automation connectors
- swarm map
- news and educational content
- richer dashboard summaries
- favorites and bookmarks
- stronger community features

## 14. Final Product Direction

`Antai` should allow users to:

- create and manage ant colonies
- keep a history of colony life
- attach notes and photos
- receive reminders
- consult care sheets
- track colony growth
- use AI to analyze colony data and images
- receive recommendations based on colony history and environment
- connect nest sensors and automation tools
- integrate with ChatGPT, Gemini, Claude, or LLM CLI workflows
- discover swarm activity
- read antkeeping guidance and news
- use the product comfortably on smartphone, tablet, TV, laptop, and desktop
- install and manage the product with minimal effort

The final product should stay as simple as possible while still offering powerful features for antkeepers.
