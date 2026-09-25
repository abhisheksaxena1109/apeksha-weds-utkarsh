import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    if (!supabase) {
      return Response.json(
        {
          message: 'Database is not configured yet. Add Supabase environment variables and try again.'
        },
        { status: 500 }
      );
    }

    const { data, error } = await supabase
      .from('wedding_rsvps')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return Response.json({ data: data || [] }, { status: 200 });
  } catch (error) {
    console.error('RSVP fetch error:', error);

    return Response.json(
      {
        message: error?.message || 'Unable to load RSVPs.'
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const { fullName, phoneNumber, attendance, guestCount, dietaryNotes } = body;

    if (!fullName || !phoneNumber) {
      return Response.json(
        { message: 'Full name and Phone Number are required.' },
        { status: 400 }
      );
    }

    if (!supabase) {
      return Response.json(
        {
          message: 'Database is not configured yet. Add Supabase environment variables and try again.'
        },
        { status: 500 }
      );
    }

    const { data, error } = await supabase.from('wedding_rsvps').insert([
      {
        full_name: fullName,
        phone_number: phoneNumber,
        attendance,
        guest_count: Number(guestCount || 1),
        dietary_notes: dietaryNotes || '',
        created_at: new Date().toISOString()
      }
    ]);

    if (error) {
      throw error;
    }

    return Response.json(
      {
        message: 'Your RSVP has been saved successfully.',
        data
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('RSVP error:', error);

    return Response.json(
      {
        message: error?.message || 'Unable to save RSVP. Please try again.'
      },
      { status: 500 }
    );
  }
}
