import { MetadataRoute } from 'next';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://apptdunion.me';

    // Get all blogs
    const blogsRef = collection(db, 'blogs');
    const q = query(blogsRef, orderBy('created_at', 'desc'));
    const snapshot = await getDocs(q);

    const blogs = snapshot.docs.map((doc) => ({
        url: `${baseUrl}/blog/${doc.data().slug}`,
        lastModified: doc.data().updated_at?.toDate() || doc.data().created_at?.toDate() || new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    const routes = [
        '',
        '/about',
        '/contact',
        '/category/circulars',
        '/union-affairs',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1.0,
    }));

    return [...routes, ...blogs];
}
