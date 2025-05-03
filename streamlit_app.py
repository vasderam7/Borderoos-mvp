
import streamlit as st
import json

# Load itinerary data
with open("borderoos_airasia_demo.json") as f:
    itinerary = json.load(f)

# App branding
st.set_page_config(page_title="Borderoos MVP", layout="centered")
st.title("🦘 Borderoos Travel Concierge")
st.subheader("Your Trip, Beautifully Organised")

# Display traveller name and booking reference
st.markdown(f"**Traveller:** {itinerary['traveller_name']}  
**Booking Ref:** `{itinerary['booking_reference']}`")
st.markdown("---")

# Flight timeline display
for idx, flight in enumerate(itinerary["flights"]):
    st.markdown(f"### ✈️ Flight {idx+1}: {flight['flight_number']} ({flight['airline']})")
    st.markdown(f"**From:** {flight['departure_airport']}  
**To:** {flight['arrival_airport']}")
    st.markdown(f"🕒 **Departs:** {flight['departure_time']}  
🕓 **Arrives:** {flight['arrival_time']}")
    st.markdown(f"💺 **Seat:** {flight['seat']}  
🧳 **Baggage:** {flight['baggage']}")
    st.markdown(f"🍱 **Meal:** {flight['meal']}")
    st.markdown("🔒 **Add-ons:**")
    for addon in flight["addons"]:
        st.markdown(f"- {addon}")
    st.markdown("---")

# Layover block
layover = itinerary["layover"]
st.markdown(f"🛑 **Layover in {layover['location']}** — Duration: {layover['duration']}")

# Protection recommendation section
st.markdown("---")
st.markdown("## 🛡️ Embedded Protection Prompt")
st.info("You're travelling internationally with a long overnight layover. We recommend:")
st.markdown("- ✈️ **Travel Delay Protection** (parametric payout if your flight is delayed 2+ hours)")
st.markdown("- 🏥 **International Medical Cover** (for emergencies in transit zones)")
st.markdown("- 🧳 **Baggage Protection** (enhanced support during long stopovers)")

st.success("Roos has you covered. Travel boldly.")
