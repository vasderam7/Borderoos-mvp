
import streamlit as st
import json

# Load the structured itinerary data
with open("borderoos_airasia_demo.json") as f:
    itinerary = json.load(f)

st.set_page_config(page_title="Borderoos MVP", layout="centered")
st.title("Borderoos Travel Concierge Demo")
st.subheader(f"Booking Ref: {itinerary['booking_reference']} | Traveller: {itinerary['traveller_name']}")

st.markdown("---")
for idx, flight in enumerate(itinerary['flights']):
    st.markdown(f"### Flight {idx+1}: {flight['flight_number']} ({flight['airline']})")
    st.markdown(f"**From:** {flight['departure_airport']}")
    st.markdown(f"**To:** {flight['arrival_airport']}")
    st.markdown(f"**Departure:** {flight['departure_time']}")
    st.markdown(f"**Arrival:** {flight['arrival_time']}")
    st.markdown(f"**Seat:** {flight['seat']}")
    st.markdown(f"**Baggage:** {flight['baggage']}")
    st.markdown(f"**Meal:** {flight['meal']}")
    st.markdown("**Add-ons:**")
    for addon in flight['addons']:
        st.markdown(f"- {addon}")
    st.markdown("---")

st.markdown(f"### Layover in {itinerary['layover']['location']}")
st.markdown(f"**Duration:** {itinerary['layover']['duration']}")

st.markdown("---")
st.markdown("### Embedded Protection Prompt")
st.info("Suggested: Add Travel Delay and International Health Cover for your 14h layover in Kuala Lumpur.")
st.success("Roos has your back. Travel boldly.")
