import { test } from 'vitest';
import timeSlotsService from './timeSlotsService.js';

test('adds 1+ 2 to equal 3', async () => {
  console.log(
    await timeSlotsService(
      [
        {
          duration: 5776799,
          isOffline: false,
          file: '/data/movies/Hocus Pocus (1993)/Hocus Pocus (1993) {imdb-tt0107120} [Bluray-1080p][DTS 5.1][x264]-RDK123.mkv',
          key: '/library/metadata/19302',
          serverKey: 'dionysus',
          showTitle: 'Hocus Pocus',
          title: 'Hocus Pocus',
          type: 'movie',
        },
        {
          duration: 5526279,
          isOffline: false,
          file: '/data/movies/Beetlejuice (1988)/Beetlejuice (1988) {imdb-tt0094721} [Bluray-1080p][DTS 5.1][x264]-CtrlHD.mkv',
          key: '/library/metadata/18730',
          serverKey: 'dionysus',
          showTitle: 'Beetlejuice',
          title: 'Beetlejuice',
          type: 'movie',
        },
        {
          duration: 6308448,
          isOffline: false,
          file: '/data/movies/Ghostbusters (1984)/Ghostbusters (1984) {imdb-tt0087332} [Bluray-1080p][DTS 5.1][x264]-D-Z0N3.mkv',
          key: '/library/metadata/19133',
          serverKey: 'dionysus',
          showTitle: 'Ghostbusters',
          title: 'Ghostbusters',
          type: 'movie',
        },
        {
          duration: 7436480,
          isOffline: false,
          file: '/data/movies/Ghostbusters Afterlife (2021)/Ghostbusters Afterlife (2021) {imdb-tt4513678} [Bluray-1080p][EAC3 5.1][x264]-iFT.mkv',
          key: '/library/metadata/12163',
          serverKey: 'dionysus',
          showTitle: 'Ghostbusters: Afterlife',
          title: 'Ghostbusters: Afterlife',
          type: 'movie',
        },
        {
          duration: 5053010,
          isOffline: false,
          file: '/data/movies/Halloweentown (1998)/Halloweentown (1998) {imdb-tt0173886} [DSNP][WEBRip-720p][AAC 2.0][x264]-TVSmash.mkv',
          key: '/library/metadata/14983',
          serverKey: 'dionysus',
          showTitle: 'Halloweentown',
          title: 'Halloweentown',
          type: 'movie',
        },
      ],
      {
        period: 86400000,
        lateness: 0,
        maxDays: 2,
        flexPreference: 'distribute',
        slots: [
          {
            time: 3600000,
            showId: 'movie.',
            order: 'shuffle',
          },
        ],
        pad: 1,
        timeZoneOffset: 240,
      },
    ),
  );
});
