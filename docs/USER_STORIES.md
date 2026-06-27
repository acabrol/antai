# Antai User Stories

## 1. Purpose

This document lists user stories derived from the current `Antai` requirements and specifications.

It is intended to support:

- feature planning
- implementation sequencing
- acceptance thinking

## 2. Account Stories

- As a new user, I want to create an account so that I can keep my colony data private.
- As a new user, I want to verify my email so that my account becomes usable.
- As a returning user, I want to log in quickly so that I can continue tracking my colonies.
- As a user, I want to log out so that I can safely leave the application on a shared device.
- As a user, I want to see my profile so that I can understand my account status and preferences.
- As a user, I want to choose whether I receive newsletters so that I control product communication.
- As a user, I want to sign in with Google so that I can access the application with less friction.

## 3. Colony Stories

- As an antkeeper, I want to create a colony so that I can start tracking it.
- As an antkeeper, I want to name a colony so that I can distinguish it from others.
- As an antkeeper, I want to assign a species so that I can relate the colony to care guidance.
- As an antkeeper, I want to record the number of queens so that I can describe the colony correctly.
- As an antkeeper, I want to archive an inactive colony so that my main list stays clear.
- As an antkeeper, I want to browse all colonies so that I can quickly understand my current collection.
- As an antkeeper, I want to open a colony detail page so that I can see everything related to one colony in one place.

## 4. Journal Stories

- As an antkeeper, I want to add an event to a colony so that I keep a reliable history.
- As an antkeeper, I want to record feeding events so that I know when and how the colony was fed.
- As an antkeeper, I want to record brood changes so that I can follow colony growth.
- As an antkeeper, I want to record setup changes so that I can relate behavior to environment changes.
- As an antkeeper, I want to search past events so that I can find older observations quickly.
- As an antkeeper, I want to filter events by type so that I can focus on one kind of colony activity.

## 5. Reminder Stories

- As an antkeeper, I want to create reminders so that I do not forget care tasks.
- As an antkeeper, I want to link a reminder to a colony so that the task has clear context.
- As an antkeeper, I want repeating reminders so that routine care becomes easier to manage.
- As an antkeeper, I want to complete a reminder so that the system reflects real work done.
- As an antkeeper, I want to snooze a reminder so that I can delay a task without losing it.
- As an antkeeper, I want to see overdue reminders so that I know what needs urgent attention.

## 6. Species Stories

- As an antkeeper, I want to browse care sheets so that I can learn how to care for a species.
- As an antkeeper, I want to search for a species so that I can find guidance quickly.
- As an antkeeper, I want to save useful species pages so that I can return to them later.
- As an antkeeper, I want to use an unknown species option so that I can still track a colony before exact identification.

## 7. Photo Stories

- As an antkeeper, I want to upload colony photos so that I build a visual history.
- As an antkeeper, I want to upload colony videos so that I can record movement and behavior.
- As an antkeeper, I want to upload event photos so that I attach evidence to observations.
- As an antkeeper, I want to upload event videos so that I can document dynamic events.
- As an antkeeper, I want to download my photos and videos so that I keep control of my media.
- As an antkeeper, I want to compare older and newer images so that I can detect changes over time.
- As an antkeeper, I want to browse media in galleries so that visual review feels natural.
- As an antkeeper, I want to view videos in playlists so that I can follow ordered visual sequences.

## 8. Colony Map Stories

- As an antkeeper, I want to create a map of my colony or nest so that I can model the real setup visually.
- As an antkeeper, I want to define named zones on the map so that I can separate monitored areas.
- As an antkeeper, I want to link galleries to map zones so that each area has relevant media.
- As an antkeeper, I want to link playlists to map zones so that I can follow video history by area.
- As an antkeeper, I want to connect sensors to zones so that I know where measurements come from.
- As an antkeeper, I want to connect camera streams to zones so that I can observe a specific area.
- As an antkeeper, I want to connect domotic actions to zones so that nest control is tied to real areas.
- As an antkeeper, I want sensor values to be recorded over time so that I can review historical changes by zone.

## 9. Dashboard Stories

- As a user, I want a dashboard so that I see what matters immediately.
- As a user, I want upcoming reminders on the dashboard so that I know what to do next.
- As a user, I want recent colony activity on the dashboard so that I quickly catch up.
- As a user, I want quick access to AI so that I can ask for help when reviewing the dashboard.

## 10. AI Stories

- As an antkeeper, I want to ask AI about a colony so that I better understand what is happening.
- As an antkeeper, I want AI to summarize colony evolution so that I can review long history quickly.
- As an antkeeper, I want AI to recommend next actions so that I can act with more confidence.
- As an antkeeper, I want AI to warn me about possible problems so that I notice risks earlier.
- As an antkeeper, I want AI to analyze a photo so that I can estimate ant count or detect brood faster.
- As an antkeeper, I want AI to suggest a species from a picture so that I get identification help.
- As an antkeeper, I want AI to use zone and sensor context so that recommendations are more precise.

## 11. Sensor and Automation Stories

- As an antkeeper, I want to connect nest sensors so that I can monitor temperature and humidity.
- As an antkeeper, I want to link a sensor source to a colony so that environment data has context.
- As an antkeeper, I want to see environment history so that I can compare it to colony behavior.
- As an antkeeper, I want to see environment history by zone so that I can locate where issues happen.
- As an antkeeper, I want alerts when values go outside expected ranges so that I can react quickly.
- As an antkeeper, I want to connect Home Assistant, Jeedom, or Domoticz so that I can integrate my existing setup.
- As an antkeeper, I want readable automation rules so that I understand what the system is doing for my nests.

## 12. LLM Integration Stories

- As a user, I want to query my colony data from ChatGPT so that I can use conversational AI with my real data.
- As a user, I want to use Antai from Gemini so that I can access analysis through another AI tool.
- As a user, I want to use Antai from Claude so that I can access the same colony context there too.
- As a user, I want to access my Antai data from an LLM CLI workflow so that I can work from command-line tools.
- As a user, I want the same colony information to remain readable in web and LLM contexts so that I am not locked into one interface.
- As a user, I want map zones, linked media, and recorded sensor values to be readable from LLM workflows so that I can analyze them outside the GUI.

## 13. Community and Content Stories

- As an antkeeper, I want to report a swarm sighting so that I can contribute to a shared map.
- As an antkeeper, I want to browse swarm sightings so that I can follow seasonal activity.
- As an antkeeper, I want to read educational content so that I improve my antkeeping knowledge.
- As an antkeeper, I want featured content in the app so that I discover useful information without leaving the product.

## 14. Device Stories

- As a mobile user, I want quick capture and reminder actions so that I can update colonies in seconds.
- As a tablet user, I want more spacious layouts so that reading and review feel comfortable.
- As a desktop user, I want efficient filtering and detail views so that I can manage many colonies easily.
- As a TV user, I want a passive dashboard mode so that I can display colony or environment status from a distance.
