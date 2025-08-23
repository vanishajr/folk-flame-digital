import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  Star, 
  Award, 
  Trophy, 
  Crown, 
  Shield, 
  TrendingUp, 
  Users,
  Calendar,
  Image,
  Heart,
  Eye
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Artist {
  id: string;
  name: string;
  avatar: string;
  artworkCount: number;
  joinDate: string;
  followers: number;
  totalViews: number;
  totalLikes: number;
  badges: Badge[];
  isVerified: boolean;
  verificationDate?: string;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  requirement: string;
  isEarned: boolean;
  earnedDate?: string;
  progress?: number;
  maxProgress?: number;
}

const ArtistBadging: React.FC = () => {
  const { t } = useLanguage();
  const [artists, setArtists] = useState<Artist[]>([]);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  // Sample artist data
  useEffect(() => {
    const sampleArtists: Artist[] = [
      {
        id: '1',
        name: 'Bhuri Bai',
        avatar: 'https://mainbhibharat.co.in/wp-content/uploads/2023/12/Bhuri-bai.jpg',
        artworkCount: 15,
        joinDate: '2022-03-15',
        followers: 1200,
        totalViews: 8500,
        totalLikes: 3200,
        badges: [],
        isVerified: true,
        verificationDate: '2023-06-20'
      },
      {
        id: '2',
        name: 'Sita Devi',
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Sita_Devi_of_Kapurthala.jpg',
        artworkCount: 8,
        joinDate: '2022-08-10',
        followers: 850,
        totalViews: 4200,
        totalLikes: 1800,
        badges: [],
        isVerified: true,
        verificationDate: '2023-09-15'
      },
      {
        id: '3',
        name: 'Jivya Soma Mashe',
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Jivya_Soma_Mashe.jpg',
        artworkCount: 22,
        joinDate: '2021-12-01',
        followers: 2100,
        totalViews: 15600,
        totalLikes: 7200,
        badges: [],
        isVerified: true,
        verificationDate: '2022-05-10'
      },
      {
        id: '4',
        name: 'Anil Vangad',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxP1XmZ2ZK-fevL6QntPbBYOn-z9S7ij2axQ&s',
        artworkCount: 2,
        joinDate: '2023-01-20',
        followers: 120,
        totalViews: 800,
        totalLikes: 300,
        badges: [],
        isVerified: false
      },
      {
        id: '5',
        name: 'Kalam Patua',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDYKDkh9IJNECuJ_AM_3GcBT1rfo1pVKp63XyWqcHPwW155eF-3142Q55ohiX6nDiRv9I&usqp=CAU',
        artworkCount: 6,
        joinDate: '2022-11-05',
        followers: 650,
        totalViews: 3800,
        totalLikes: 1600,
        badges: [],
        isVerified: true,
        verificationDate: '2023-07-30'
      }
    ];

    // Calculate badges for each artist
    const artistsWithBadges = sampleArtists.map(artist => ({
      ...artist,
      badges: calculateBadges(artist)
    }));

    setArtists(artistsWithBadges);
  }, []);

  const calculateBadges = (artist: Artist): Badge[] => {
    const badges: Badge[] = [
      {
        id: 'verified',
        name: 'Verified Artist',
        description: 'Awarded for uploading 3+ artworks',
        icon: CheckCircle,
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        requirement: 'Upload 3+ artworks',
        isEarned: artist.artworkCount >= 3,
        earnedDate: artist.isVerified ? artist.verificationDate : undefined,
        progress: Math.min(artist.artworkCount, 3),
        maxProgress: 3
      },
      {
        id: 'prolific',
        name: 'Prolific Creator',
        description: 'Awarded for uploading 10+ artworks',
        icon: Star,
        color: 'bg-purple-100 text-purple-800 border-purple-200',
        requirement: 'Upload 10+ artworks',
        isEarned: artist.artworkCount >= 10,
        earnedDate: artist.artworkCount >= 10 ? '2023-12-01' : undefined,
        progress: Math.min(artist.artworkCount, 10),
        maxProgress: 10
      },
      {
        id: 'master',
        name: 'Master Artist',
        description: 'Awarded for uploading 20+ artworks',
        icon: Crown,
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        requirement: 'Upload 20+ artworks',
        isEarned: artist.artworkCount >= 20,
        earnedDate: artist.artworkCount >= 20 ? '2023-12-01' : undefined,
        progress: Math.min(artist.artworkCount, 20),
        maxProgress: 20
      },
      {
        id: 'popular',
        name: 'Popular Artist',
        description: 'Awarded for reaching 1000+ followers',
        icon: Users,
        color: 'bg-green-100 text-green-800 border-green-200',
        requirement: 'Reach 1000+ followers',
        isEarned: artist.followers >= 1000,
        earnedDate: artist.followers >= 1000 ? '2023-12-01' : undefined,
        progress: Math.min(artist.followers, 1000),
        maxProgress: 1000
      },
      {
        id: 'trending',
        name: 'Trending Artist',
        description: 'Awarded for 5000+ total views',
        icon: TrendingUp,
        color: 'bg-orange-100 text-orange-800 border-orange-200',
        requirement: 'Reach 5000+ total views',
        isEarned: artist.totalViews >= 5000,
        earnedDate: artist.totalViews >= 5000 ? '2023-12-01' : undefined,
        progress: Math.min(artist.totalViews, 5000),
        maxProgress: 5000
      },
      {
        id: 'beloved',
        name: 'Beloved Artist',
        description: 'Awarded for 2000+ total likes',
        icon: Heart,
        color: 'bg-pink-100 text-pink-800 border-pink-200',
        requirement: 'Reach 2000+ total likes',
        isEarned: artist.totalLikes >= 2000,
        earnedDate: artist.totalLikes >= 2000 ? '2023-12-01' : undefined,
        progress: Math.min(artist.totalLikes, 2000),
        maxProgress: 2000
      }
    ];

    return badges;
  };

  const getVerificationStatus = (artist: Artist) => {
    if (artist.isVerified) {
      return (
        <div className="flex items-center text-green-600">
          <CheckCircle className="h-5 w-5 mr-2" />
          <span className="font-medium">Verified Artist</span>
          <Badge variant="outline" className="ml-2 text-xs">
            Since {new Date(artist.verificationDate!).toLocaleDateString()}
          </Badge>
        </div>
      );
    } else {
      const remaining = 3 - artist.artworkCount;
      return (
        <div className="flex items-center text-yellow-600">
          <Shield className="h-5 w-5 mr-2" />
          <span className="font-medium">Not Verified</span>
          <Badge variant="outline" className="ml-2 text-xs">
            {remaining} more artwork{remaining !== 1 ? 's' : ''} needed
          </Badge>
        </div>
      );
    }
  };

  const getProgressToVerification = (artist: Artist) => {
    const progress = Math.min((artist.artworkCount / 3) * 100, 100);
    return (
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress to Verification</span>
          <span>{artist.artworkCount}/3 artworks</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Award className="h-12 w-12 text-purple-600 mr-3" />
          <h1 className="text-4xl font-bold text-gray-900">Artist Badging System</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Automatically earn badges and verification status based on your contributions and engagement
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {artists.filter(a => a.isVerified).length}
            </div>
            <p className="text-sm text-gray-600">Verified Artists</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {artists.length}
            </div>
            <p className="text-sm text-gray-600">Total Artists</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <Image className="h-8 w-8 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {artists.reduce((sum, a) => sum + a.artworkCount, 0)}
            </div>
            <p className="text-sm text-gray-600">Total Artworks</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <Trophy className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {artists.reduce((sum, a) => sum + a.badges.filter(b => b.isEarned).length, 0)}
            </div>
            <p className="text-sm text-gray-600">Badges Awarded</p>
          </CardContent>
        </Card>
      </div>

      {/* Artists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artists.map((artist) => (
          <Card 
            key={artist.id} 
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedArtist?.id === artist.id ? 'ring-2 ring-purple-500' : ''
            }`}
            onClick={() => setSelectedArtist(artist)}
          >
            <CardHeader className="text-center pb-4">
              <Avatar className="h-20 w-20 mx-auto mb-3">
                <AvatarImage src={artist.avatar} alt={artist.name} />
                <AvatarFallback className="text-2xl">
                  {artist.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl">{artist.name}</CardTitle>
              <CardDescription>
                Joined {new Date(artist.joinDate).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Verification Status */}
              {getVerificationStatus(artist)}
              
              {/* Progress to Verification */}
              {!artist.isVerified && getProgressToVerification(artist)}

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <div>
                  <div className="font-semibold text-gray-900">{artist.artworkCount}</div>
                  <div className="text-gray-600">Artworks</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{artist.followers}</div>
                  <div className="text-gray-600">Followers</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{artist.totalViews}</div>
                  <div className="text-gray-600">Views</div>
                </div>
              </div>

              {/* Badge Preview */}
              <div className="flex flex-wrap gap-1 justify-center">
                {artist.badges.slice(0, 3).map((badge) => (
                  <Badge 
                    key={badge.id} 
                    className={`text-xs ${badge.isEarned ? badge.color : 'bg-gray-100 text-gray-400 border-gray-200'}`}
                  >
                    {badge.isEarned ? badge.name : '?'}
                  </Badge>
                ))}
                {artist.badges.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{artist.badges.length - 3} more
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Artist Detail Modal */}
      {selectedArtist && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedArtist.avatar} alt={selectedArtist.name} />
                    <AvatarFallback className="text-2xl">
                      {selectedArtist.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl">{selectedArtist.name}</CardTitle>
                    <CardDescription>
                      Member since {new Date(selectedArtist.joinDate).toLocaleDateString()}
                    </CardDescription>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedArtist(null)}
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Stats Overview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{selectedArtist.artworkCount}</div>
                  <div className="text-sm text-gray-600">Artworks</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{selectedArtist.followers}</div>
                  <div className="text-sm text-gray-600">Followers</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{selectedArtist.totalViews}</div>
                  <div className="text-sm text-gray-600">Total Views</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{selectedArtist.totalLikes}</div>
                  <div className="text-sm text-gray-600">Total Likes</div>
                </div>
              </div>

              {/* Badges Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Badges & Achievements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedArtist.badges.map((badge) => {
                    const Icon = badge.icon;
                    return (
                      <Card key={badge.id} className={badge.isEarned ? 'border-green-200' : 'border-gray-200'}>
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-lg ${badge.isEarned ? badge.color : 'bg-gray-100'}`}>
                              <Icon className={`h-5 w-5 ${badge.isEarned ? 'text-current' : 'text-gray-400'}`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className={`font-medium ${badge.isEarned ? 'text-gray-900' : 'text-gray-500'}`}>
                                  {badge.name}
                                </h4>
                                {badge.isEarned && (
                                  <Badge className="text-xs bg-green-100 text-green-800">
                                    Earned
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
                              <p className="text-xs text-gray-500 mb-2">Requirement: {badge.requirement}</p>
                              
                              {badge.progress !== undefined && (
                                <div className="space-y-1">
                                  <div className="flex justify-between text-xs">
                                    <span>Progress</span>
                                    <span>{badge.progress}/{badge.maxProgress}</span>
                                  </div>
                                  <Progress 
                                    value={(badge.progress / badge.maxProgress!) * 100} 
                                    className="h-2" 
                                  />
                                </div>
                              )}

                              {badge.earnedDate && (
                                <p className="text-xs text-green-600 mt-2">
                                  Earned on {new Date(badge.earnedDate).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ArtistBadging;
