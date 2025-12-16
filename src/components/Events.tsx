import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CalendarIcon, MapPinIcon, TrophyIcon } from 'lucide-react';
import { API_CONFIG } from '../config/api';
import { API_KEY } from '../config/api_key';
import { EventDetails, Award } from '../types/awards';

interface Event extends EventDetails {
  awards?: Award[];
}

export function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventDetails = async (eventId: number) => {
      try {
        const response = await axios.get(
          `${API_CONFIG.BASE_URL}/events/${eventId}`,
          {
            headers: {
              Authorization: `Bearer ${API_KEY.TOKEN}`
            }
          }
        );
        return response.data.data;
      } catch (err) {
        console.error(`Failed to fetch details for event ${eventId}`, err);
        return null;
      }
    };

    const fetchAwards = async () => {
      try {
        const response = await axios.get(
          `${API_CONFIG.BASE_URL}/teams/${API_CONFIG.TEAM_ID}/awards`,
          {
            params: {
              'season[]': API_CONFIG.SEASON_ID
            },
            headers: {
              Authorization: `Bearer ${API_KEY.TOKEN}`
            }
          }
        );
        return response.data.data;
      } catch (err) {
        console.error('Failed to fetch awards', err);
        return [];
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${API_CONFIG.BASE_URL}/teams/${API_CONFIG.TEAM_ID}/events`,
          {
            params: {
              'season[]': API_CONFIG.SEASON_ID
            },
            headers: {
              Authorization: `Bearer ${API_KEY.TOKEN}`
            }
          }
        );

        const eventsData = response.data.data;
        const awardsData = await fetchAwards();

        const eventsWithDetails = await Promise.all(
          eventsData.map(async (event: Event) => {
            const details = await fetchEventDetails(event.id);
            const eventAwards = awardsData.filter((award: Award) => award.event.id === event.id);
            return {
              ...event,
              startDate: details?.start,
              awards: eventAwards
            };
          })
        );

        // Sort events by start date
        const sortedEvents = eventsWithDetails.sort((a, b) => 
          new Date(a.startDate || a.start).getTime() - new Date(b.startDate || b.start).getTime()
        );

        setEvents(sortedEvents);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch events');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const isEventPast = (endDate: string) => {
    return new Date(endDate) < new Date();
  };

  if (loading) {
    return (
      <section id="events" className="py-20 bg-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Our Events</h2>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-400 border-t-transparent"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="events" className="py-20 bg-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Our Events</h2>
          <div className="text-center text-red-500">{error}</div>
        </div>
      </section>
    );
  }

  const upcomingEvents = events.filter(event => !isEventPast(event.end));
  const pastEvents = events.filter(event => isEventPast(event.end));

  return (
    <section id="events" className="py-20 bg-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">Our Events</h2>
        
        {upcomingEvents.length > 0 && (
          <>
            <h3 className="text-2xl font-semibold mb-6">Upcoming Events</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-4">{event.name}</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <CalendarIcon className="h-5 w-5 text-pink-400" />
                        <span className="text-gray-600">
                          {new Date(event.start).toLocaleDateString()} -{' '}
                          {new Date(event.end).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPinIcon className="h-5 w-5 text-pink-400" />
                        <span className="text-gray-600">
                          {event.location.venue}, {event.location.city}, {event.location.region}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {pastEvents.length > 0 && (
          <>
            <h3 className="text-2xl font-semibold mb-6">Past Events</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 opacity-75 blur-xs"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-4">
                      {event.name}
                      {/* <span className="ml-2 text-sm text-gray-500">(Past)</span> */}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <CalendarIcon className="h-5 w-5 text-pink-400" />
                        <span className="text-gray-600">
                          {new Date(event.start).toLocaleDateString()} -{' '}
                          {new Date(event.end).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPinIcon className="h-5 w-5 text-pink-400" />
                        <span className="text-gray-600">
                          {event.location.venue}, {event.location.city}, {event.location.region}
                        </span>
                      </div>
                      {event.awards && event.awards.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-lg font-semibold">Awards Won:</h4>

                            <ul className="list-none p-0 m-0">
                              {event.awards.map((award) => (
                                <li key={award.id} className="text-gray-600">
                                  <TrophyIcon className="inline-block h-5 w-5 text-pink-400 mr-2" />
                                  {award.title}
                                </li>
                              ))}
                            </ul>

                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}