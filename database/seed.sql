-- SEED.SQL: Populate the VisitKamer Database
-- Contains 10 Regions, 30 Cities, and 50 Tourist Sites

-- CLEAR EXISTING DATA (for idempotency during development)
TRUNCATE TABLE payments, bookings, tourist_sites, cities, regions RESTART IDENTITY CASCADE;

-- 1. INSERT REGIONS
INSERT INTO regions (name, description, image_url) VALUES
('Littoral', 'The economic heartbeat of Cameroon, featuring coastal lowlands, industrial zones, and vibrant city life.', '/images/regions/littoral.jpg'),
('Centre', 'The political capital region, rich in cultural monuments, lush forests, and government institutions.', '/images/regions/centre.jpg'),
('West', 'The cultural highlands known for its cooler climate, rich traditional chiefdoms, and intricate artisan crafts.', '/images/regions/west.jpg'),
('Northwest', 'Beautiful grassy highlands offering spectacular mountain views, crater lakes, and rich Anglophone culture.', '/images/regions/northwest.jpg'),
('Southwest', 'Home to the majestic Mount Cameroon, dark sand beaches, and incredible biodiversity.', '/images/regions/southwest.jpg'),
('Far North', 'A stunning semi-arid landscape featuring dramatic volcanic plugs, savannas, and rich wildlife.', '/images/regions/farnorth.jpg'),
('North', 'Extensive national parks, savanna ecosystems, and impressive geological formations like the Kola Gorges.', '/images/regions/north.jpg'),
('Adamawa', 'The water tower of Cameroon. A transitional zone of volcanic craters, crater lakes, and sprawling cattle ranches.', '/images/regions/adamawa.jpg'),
('East', 'Vast, untouched equatorial rainforests with massive biodiversity, indigenous Pygmy communities, and logging towns.', '/images/regions/east.jpg'),
('South', 'Pristine coastal beaches, deep equatorial forests, and the famous Lobe waterfalls meeting the ocean.', '/images/regions/south.jpg');

-- 2. INSERT CITIES (3 per Region)
INSERT INTO cities (name, region_id, description, latitude, longitude) VALUES
-- Littoral
('Douala', (SELECT id FROM regions WHERE name = 'Littoral'), 'The economic capital and largest city.', 4.0511, 9.7679),
('Edea', (SELECT id FROM regions WHERE name = 'Littoral'), 'An industrial city known for the Sanaga river dam.', 3.8055, 10.1301),
('Nkongsamba', (SELECT id FROM regions WHERE name = 'Littoral'), 'An agricultural hub shadowed by Mount Manengouba.', 4.9547, 9.9329),

-- Centre
('Yaoundé', (SELECT id FROM regions WHERE name = 'Centre'), 'The political capital, spread across seven hills.', 3.8480, 11.5021),
('Mbalmayo', (SELECT id FROM regions WHERE name = 'Centre'), 'A forestry and agricultural town south of Yaoundé.', 3.5167, 11.5000),
('Bafia', (SELECT id FROM regions WHERE name = 'Centre'), 'Known for traditional dances and agricultural produce.', 4.7500, 11.2333),

-- West
('Bafoussam', (SELECT id FROM regions WHERE name = 'West'), 'The capital city of the western highlands.', 5.4819, 10.4222),
('Dschang', (SELECT id FROM regions WHERE name = 'West'), 'A university town with a cooler climate and museums.', 5.4430, 10.0538),
('Foumban', (SELECT id FROM regions WHERE name = 'West'), 'A deeply historical city known for the Bamoun Kingdom.', 5.7289, 10.8996),

-- Northwest
('Bamenda', (SELECT id FROM regions WHERE name = 'Northwest'), 'The capital of the Northwest, nestled in the highlands.', 5.9587, 10.1524),
('Kumbo', (SELECT id FROM regions WHERE name = 'Northwest'), 'Known for horse racing and traditional palaces.', 6.2000, 10.6667),
('Wum', (SELECT id FROM regions WHERE name = 'Northwest'), 'Gateway to the scenic Menchum Falls.', 6.3833, 10.0667),

-- Southwest
('Buea', (SELECT id FROM regions WHERE name = 'Southwest'), 'Former colonial capital, situated on the slopes of Mt. Cameroon.', 4.1561, 9.2435),
('Limbe', (SELECT id FROM regions WHERE name = 'Southwest'), 'Coastal resort town with botanical gardens and black sand beaches.', 4.0240, 9.2149),
('Kumba', (SELECT id FROM regions WHERE name = 'Southwest'), 'Largest commercial town in the Southwest.', 4.6366, 9.4468),

-- Far North
('Maroua', (SELECT id FROM regions WHERE name = 'Far North'), 'Capital of the Far North, known for its artisans and dry climate.', 10.5936, 14.3159),
('Yagoua', (SELECT id FROM regions WHERE name = 'Far North'), 'A town bordering Chad, near the Logone river.', 10.3400, 15.2333),
('Mokolo', (SELECT id FROM regions WHERE name = 'Far North'), 'Gateway to the Mandara Mountains.', 10.7417, 13.8025),

-- North
('Garoua', (SELECT id FROM regions WHERE name = 'North'), 'A major port city on the Benue River.', 9.3000, 13.4000),
('Guider', (SELECT id FROM regions WHERE name = 'North'), 'Famous for the spectacular Kola Gorges nearby.', 9.9328, 13.9486),
('Figuil', (SELECT id FROM regions WHERE name = 'North'), 'Known for marble quarries and ancient petroglyphs.', 9.7500, 13.9667),

-- Adamawa
('Ngaoundéré', (SELECT id FROM regions WHERE name = 'Adamawa'), 'Capital of the Adamawa plateau, terminus of the railway.', 7.3276, 13.5847),
('Meiganga', (SELECT id FROM regions WHERE name = 'Adamawa'), 'A commercial hub in the southern part of the plateau.', 6.5167, 14.3000),
('Banyo', (SELECT id FROM regions WHERE name = 'Adamawa'), 'Known for its traditional chiefdoms and cattle markets.', 6.7500, 11.8167),

-- East
('Bertoua', (SELECT id FROM regions WHERE name = 'East'), 'Capital city of the vast Eastern forest region.', 4.5833, 13.6833),
('Batouri', (SELECT id FROM regions WHERE name = 'East'), 'A gold-mining town providing access to deep reserves.', 4.4333, 14.3667),
('Abong-Mbang', (SELECT id FROM regions WHERE name = 'East'), 'A crossroads town near the Dja Faunal Reserve.', 3.9833, 13.1833),

-- South
('Ebolowa', (SELECT id FROM regions WHERE name = 'South'), 'Capital of the Southern region, known for agriculture.', 2.9000, 11.1500),
('Kribi', (SELECT id FROM regions WHERE name = 'South'), 'Premier beach resort destination of Cameroon.', 2.9360, 9.9146),
('Sangmelima', (SELECT id FROM regions WHERE name = 'South'), 'A forestry town with access to the Dja Reserve.', 2.9333, 11.9833);

-- 3. INSERT TOURIST SITES (5 per Region)
INSERT INTO tourist_sites (name, city_id, description, latitude, longitude, image_url, price_per_person, is_featured) VALUES
-- Littoral Sites
('Douala Maritime Museum', (SELECT id FROM cities WHERE name = 'Douala'), 'Explore the rich maritime and trade history of the Cameroonian coast.', 4.0435, 9.6974, '/images/sites/douala-museum.jpg', 10.00, false),
('La Nouvelle Liberté Statue', (SELECT id FROM cities WHERE name = 'Douala'), 'A striking contemporary monument constructed from recycled metal.', 4.0620, 9.7210, '/images/sites/nouvelle-liberte.jpg', 0.00, false),
('Sanaga River Bridge', (SELECT id FROM cities WHERE name = 'Edea'), 'A historic colonial-era bridge crossing Cameroon''s largest river.', 3.8055, 10.1301, '/images/sites/sanaga-bridge.jpg', 5.00, false),
('Ekom-Nkam Waterfalls', (SELECT id FROM cities WHERE name = 'Nkongsamba'), 'Spectacular 80m twin waterfalls featured in the movie Greystoke Tarzan.', 4.8872, 9.8970, '/images/sites/ekom-nkam.jpg', 20.00, true),
('Manoka Island', (SELECT id FROM cities WHERE name = 'Douala'), 'A serene island featuring colonial remnants, monkey reserves, and mangrove forests.', 3.8167, 9.6167, '/images/sites/manoka.jpg', 35.00, false),

-- Centre Sites
('National Museum of Yaoundé', (SELECT id FROM cities WHERE name = 'Yaoundé'), 'Housed in the former presidential palace, showcasing Cameroonian art and history.', 3.8600, 11.5200, '/images/sites/national-museum.jpg', 15.00, true),
('Mvog-Betsi Zoo', (SELECT id FROM cities WHERE name = 'Yaoundé'), 'A small botanical and zoological garden home to primates and big cats.', 3.8640, 11.4930, '/images/sites/mvog-betsi.jpg', 8.00, false),
('Monument de la Réunification', (SELECT id FROM cities WHERE name = 'Yaoundé'), 'Iconic spiraling monument symbolizing the reunification of French and British Cameroons.', 3.8552, 11.5126, '/images/sites/reunification.jpg', 0.00, false),
('Ebogo Eco-Tourism Site', (SELECT id FROM cities WHERE name = 'Mbalmayo'), 'Enjoy canoe rides on the Nyong river and giant ancient trees in this serene forest.', 3.3934, 11.4398, '/images/sites/ebogo.jpg', 25.00, true),
('Nachtigal Falls', (SELECT id FROM cities WHERE name = 'Bafia'), 'Beautiful rapids and waterfalls along the Sanaga river.', 4.3500, 11.6333, '/images/sites/nachtigal.jpg', 10.00, false),

-- West Sites
('Bafoussam Chiefdom', (SELECT id FROM cities WHERE name = 'Bafoussam'), 'A highly organized traditional kingdom with stunning Bamileke architecture.', 5.4800, 10.4200, '/images/sites/bafoussam-chefferie.jpg', 15.00, true),
('Mount Bamboutos', (SELECT id FROM cities WHERE name = 'Dschang'), 'The third highest peak in Cameroon, offering phenomenal hiking trails.', 5.6167, 10.0500, '/images/sites/mt-bamboutos.jpg', 30.00, false),
('Foumban Royal Palace', (SELECT id FROM cities WHERE name = 'Foumban'), 'An incredible architectural marvel representing the deeply historic Bamoun Kingdom.', 5.7289, 10.8996, '/images/sites/foumban-palace.jpg', 25.00, true),
('Sultan''s Museum', (SELECT id FROM cities WHERE name = 'Foumban'), 'Contains thousands of artifacts detailing the Bamoun dynasty and its unique alphabet.', 5.7300, 10.9000, '/images/sites/foumban-museum.jpg', 15.00, false),
('Metche Waterfalls', (SELECT id FROM cities WHERE name = 'Bafoussam'), 'A sacred waterfall serving as a traditional site of purification and sacrifice.', 5.5120, 10.3650, '/images/sites/metche-falls.jpg', 10.00, false),

-- Northwest Sites
('Mankon Museum', (SELECT id FROM cities WHERE name = 'Bamenda'), 'A rich museum preserving the artisanal crafts and history of the Mankon kingdom.', 5.9587, 10.1524, '/images/sites/mankon.jpg', 10.00, false),
('Lake Awing', (SELECT id FROM cities WHERE name = 'Bamenda'), 'A mystical high-altitude crater lake surrounded by sacred forests.', 5.8670, 10.1830, '/images/sites/lake-awing.jpg', 15.00, true),
('Mount Oku', (SELECT id FROM cities WHERE name = 'Kumbo'), 'The second highest mountain in mainland West Africa, known for its endemic bird species.', 6.2000, 10.5167, '/images/sites/mount-oku.jpg', 35.00, true),
('Menchum Falls', (SELECT id FROM cities WHERE name = 'Wum'), 'A breathtaking cascading waterfall just off the main road.', 6.2500, 10.0000, '/images/sites/menchum-falls.jpg', 12.00, false),
('Bafut Palace', (SELECT id FROM cities WHERE name = 'Bamenda'), 'One of the oldest traditional palaces, featuring the impressive Achum shrine building.', 6.0833, 10.1167, '/images/sites/bafut-palace.jpg', 20.00, false),

-- Southwest Sites
('Mount Cameroon', (SELECT id FROM cities WHERE name = 'Buea'), 'One of Africa''s largest active volcanoes, attracting hikers from all over the globe.', 4.2030, 9.1730, '/images/sites/mt-cameroon.jpg', 85.00, true),
('Limbe Wildlife Centre', (SELECT id FROM cities WHERE name = 'Limbe'), 'A sanctuary rescuing and rehabilitating primates, including gorillas and chimps.', 4.0130, 9.2080, '/images/sites/limbe-wildlife.jpg', 20.00, true),
('Limbe Botanic Garden', (SELECT id FROM cities WHERE name = 'Limbe'), 'Established in 1892, featuring incredible tropical plant biodiversity and historical graves.', 4.0160, 9.2100, '/images/sites/limbe-gardens.jpg', 10.00, false),
('Korup National Park', (SELECT id FROM cities WHERE name = 'Kumba'), 'Africa''s oldest and most biologically diverse rainforest, accessible via a suspension bridge.', 5.0500, 8.8500, '/images/sites/korup.jpg', 50.00, true),
('Down Beach', (SELECT id FROM cities WHERE name = 'Limbe'), 'Famed for its volcanic black sand and freshly grilled seafood straight from the ocean.', 4.0100, 9.2200, '/images/sites/down-beach.jpg', 0.00, false),

-- Far North Sites
('Waza National Park', (SELECT id FROM cities WHERE name = 'Maroua'), 'A huge UNESCO biosphere reserve packed with lions, elephants, giraffes, and birdlife.', 11.3833, 14.6500, '/images/sites/waza-park.jpg', 120.00, true),
('Mandara Mountains', (SELECT id FROM cities WHERE name = 'Mokolo'), 'Rugged volcanic peaks jutting out of the dry plains, dotted with traditional villages.', 10.8833, 13.7833, '/images/sites/mandara.jpg', 40.00, true),
('Rhumsiki Peaks', (SELECT id FROM cities WHERE name = 'Mokolo'), 'The famous volcanic "needle" rock formations offering the most spectacular sunsets.', 10.5667, 13.5667, '/images/sites/rhumsiki.jpg', 25.00, true),
('Lake Chad Shores', (SELECT id FROM cities WHERE name = 'Yagoua'), 'The marshy expanses of the historic shrinking lake, vital for nomadic herders and fishers.', 13.0500, 14.4833, '/images/sites/lake-chad.jpg', 50.00, false),
('Maroua Artisanal Center', (SELECT id FROM cities WHERE name = 'Maroua'), 'A massive market famous for intricate leatherwork, pottery, and vibrant fabrics.', 10.5936, 14.3159, '/images/sites/maroua-market.jpg', 0.00, false),

-- North Sites
('Benoue National Park', (SELECT id FROM cities WHERE name = 'Garoua'), 'A large wildlife reserve featuring the Benoue river, hippos, and the Lord Derby eland.', 8.2833, 13.8500, '/images/sites/benoue.jpg', 75.00, true),
('Faro National Park', (SELECT id FROM cities WHERE name = 'Garoua'), 'A less-visited, dense savanna park home to elephants, cheetahs, and rhinos.', 8.3500, 12.8333, '/images/sites/faro.jpg', 80.00, false),
('Kola Gorges', (SELECT id FROM cities WHERE name = 'Guider'), 'Spectacular narrow, deep canyons carved into the rock by rivers over millennia.', 9.8760, 13.9100, '/images/sites/kola-gorges.jpg', 20.00, true),
('Lagdo Dam', (SELECT id FROM cities WHERE name = 'Garoua'), 'An enormous hydroelectric dam and scenic reservoir providing fishing boundaries.', 8.8833, 13.9667, '/images/sites/lagdo.jpg', 15.00, false),
('Bidzar Petroglyphs', (SELECT id FROM cities WHERE name = 'Figuil'), 'Ancient geometric rock engravings dating back thousands of years.', 9.8500, 14.1000, '/images/sites/bidzar.jpg', 10.00, false),

-- Adamawa Sites
('Tello Waterfalls', (SELECT id FROM cities WHERE name = 'Ngaoundéré'), 'A gorgeous wide waterfall cascading over a basalt rock cave.', 7.2167, 13.8833, '/images/sites/tello-falls.jpg', 15.00, true),
('Lake Dang', (SELECT id FROM cities WHERE name = 'Ngaoundéré'), 'A peaceful crater lake located next to the University of Ngaoundéré.', 7.4200, 13.5500, '/images/sites/lake-dang.jpg', 5.00, false),
('Vina River Falls', (SELECT id FROM cities WHERE name = 'Ngaoundéré'), 'A dramatically scenic canyon waterfall where the Vina river drops into a basin.', 7.2333, 13.5833, '/images/sites/vina-falls.jpg', 12.00, false),
('Mount Ngaoundéré', (SELECT id FROM cities WHERE name = 'Ngaoundéré'), 'Overlooking the city, providing panoramic views across the Adamawa plateau.', 7.3276, 13.5847, '/images/sites/mt-ngaoundere.jpg', 10.00, false),
('Banyo Lamidat', (SELECT id FROM cities WHERE name = 'Banyo'), 'The impressive traditional palace of the Banyo Lamido, a powerful local leader.', 6.7500, 11.8167, '/images/sites/banyo-lamidat.jpg', 10.00, false),

-- East Sites
('Lobéké National Park', (SELECT id FROM cities WHERE name = 'Batouri'), 'Dense tropical rainforest, famous for its forest elephant clearings (bais).', 2.3000, 15.8667, '/images/sites/lobeke.jpg', 150.00, true),
('Dja Faunal Reserve', (SELECT id FROM cities WHERE name = 'Abong-Mbang'), 'A UNESCO World Heritage site and one of Africa''s largest and best-protected rainforests.', 3.0000, 13.0000, '/images/sites/dja-reserve.jpg', 200.00, true),
('Boumba Bek National Park', (SELECT id FROM cities WHERE name = 'Bertoua'), 'A remote park highly protected and packed with gorillas and chimpanzees.', 2.7667, 15.0833, '/images/sites/boumba-bek.jpg', 100.00, false),
('Deng Deng National Park', (SELECT id FROM cities WHERE name = 'Bertoua'), 'A crucial sanctuary protecting the northernmost population of Western Lowland Gorillas.', 5.2500, 13.4167, '/images/sites/deng-deng.jpg', 80.00, false),
('Nki National Park', (SELECT id FROM cities WHERE name = 'Batouri'), 'Features massive waterfalls and pristine, unexplored river systems.', 2.5000, 14.5000, '/images/sites/nki.jpg', 120.00, false),

-- South Sites
('Lobe Waterfalls', (SELECT id FROM cities WHERE name = 'Kribi'), 'The world-famous waterfalls that drop dramatically straight into the Atlantic Ocean.', 2.8800, 9.8970, '/images/sites/lobe-falls.jpg', 25.00, true),
('Campo Ma''an National Park', (SELECT id FROM cities WHERE name = 'Kribi'), 'Home to gorillas and elephants that occasionally wander down to the beaches.', 2.3333, 10.0500, '/images/sites/campo-maan.jpg', 60.00, true),
('Grand Batanga Beach', (SELECT id FROM cities WHERE name = 'Kribi'), 'Pristine, quiet stretch of sandy beaches perfect for swimming and relaxing.', 2.8333, 9.9000, '/images/sites/grand-batanga.jpg', 5.00, false),
('Kribi Lighthouse', (SELECT id FROM cities WHERE name = 'Kribi'), 'A historic German colonial lighthouse built in 1906, standing sentinel over the harbor.', 2.9400, 9.9110, '/images/sites/kribi-lighthouse.jpg', 5.00, false),
('Nkolandom Tourist Center', (SELECT id FROM cities WHERE name = 'Ebolowa'), 'A beautifully designed eco-village showcasing rock formations, museum, and forest walks.', 2.8000, 11.2000, '/images/sites/nkolandom.jpg', 30.00, true);

-- Verification logic (Optional for checks)
-- SELECT count(*) FROM regions;      -- Should be 10
-- SELECT count(*) FROM cities;       -- Should be 30
-- SELECT count(*) FROM tourist_sites;-- Should be 50
